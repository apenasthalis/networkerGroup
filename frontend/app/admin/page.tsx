"use client"

import React, { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, X, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useQueryIntention } from "@/hooks/useQueryIntention"
import { api } from "@/services/api"
import { toast } from "sonner"

type Intencao = {
  id: string;
  public_id: string;
  business_name: string;
  email: string;
  reason_participation: string;
  status: "pendente" | "aceita" | "recusada";
  is_confirmed: boolean;
  created_at: string;
};

function AdminPageContent() {
  const queryClient = useQueryClient();
  const { data: intentions } = useSuspenseQuery(useQueryIntention());

  const approveMutation = useMutation({
    mutationFn: (public_id: string) => api.post(`/intention/${public_id}/approve`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
      toast.success("Intenção aprovada com sucesso!");
      if (data.data.member && data.data.member.token) {
        console.log(`=== Email Simulado ====`);
        console.log(`Para: ${data.data.member.email}`);
        console.log(`Token de acesso: ${data.data.member.token}`);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao aprovar a intenção.");
    }
  });

  const refuseMutation = useMutation({
    mutationFn: (public_id: string) => api.post(`/intention/${public_id}/refuse`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["intentions"] });
      toast.success("Intenção recusada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao recusar a intenção.");
    }
  });

  const aprovar = (public_id: string) => {
    approveMutation.mutate(public_id);
  }

  const recusar = (public_id: string) => {
    refuseMutation.mutate(public_id);
  }

  const getStatusBadge = (status: "pendente" | "aceita" | "recusada") => {
    switch (status) {
      case "aceita":
        return <Badge className="bg-accent text-accent-foreground">Aprovado</Badge>;
      case "recusada":
        return <Badge variant="destructive">Recusado</Badge>;
      case "pendente":
      default:
        return (
          <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/20 text-yellow-700">
            Pendente
          </Badge>
        );
    }
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
      <div className="mx-auto px-4 max-w-6xl container">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Link>
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 font-bold text-4xl">Área do Administrador</h1>
            <p className="text-muted-foreground">Gerencie todas as intenções de participação</p>
          </div>

          {intentions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Nenhuma intenção registrada ainda.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="gap-4 grid">
              {intentions.map((data: Intencao) => (
                <Card key={data.id} className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{data.business_name}</CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {data.email}
                          </div>
                          <div>{data.business_name}</div>
                          <div className="text-xs">{new Date(data.created_at).toLocaleString("pt-BR")}</div>
                        </CardDescription>
                      </div>
                      {getStatusBadge(data.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold">Motivação:</h4>
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">{data.reason_participation}</p>
                    </div>

                    {data.status === "pendente" && !data.is_confirmed && (
                      <div className="flex gap-2">
                        <Button onClick={() => aprovar(data.public_id)} className="flex-1">
                          <Check className="mr-2 w-4 h-4" />
                          Aprovar
                        </Button>
                        <Button onClick={() => recusar(data.public_id)} variant="destructive" className="flex-1">
                          <X className="mr-2 w-4 h-4" />
                          Recusar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"

    if (password === adminPassword) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Senha incorreta")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
        <div className="mx-auto px-4 max-w-md container">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Link>
          </Button>

          <Card className="border-2">
            <CardHeader className="space-y-2 text-center">
              <div className="flex justify-center items-center bg-primary/10 mx-auto rounded-full w-12 h-12">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Área do Administrador</CardTitle>
              <CardDescription>Faça login para acessar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite a senha de administrador"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {error && <p className="text-destructive text-sm">{error}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
              <p className="mt-4 text-muted-foreground text-xs text-center">
                Dica: Configure NEXT_PUBLIC_ADMIN_PASSWORD no ambiente
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AdminPageContent />
    </Suspense>
  )
}