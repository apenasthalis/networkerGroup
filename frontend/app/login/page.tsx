"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, LogIn, Key } from "lucide-react"
import Link from "next/link"
import { api } from "@/services/api"

export default function LoginPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await api.post('/auth/validate-token', { token });
      
      if (response.status === 200) {
        sessionStorage.setItem("userToken", token);
        router.push("/cadastro-completo");
      } else {
        setError("Token inválido. Verifique o token enviado por e-mail.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Erro ao validar o token. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

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
              <LogIn className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Login de Membro</CardTitle>
            <CardDescription>Entre com o token enviado por e-mail após aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Token de Acesso</Label>
                <div className="relative">
                  <Key className="top-3 left-3 absolute w-4 h-4 text-muted-foreground" />
                  <Input
                    id="token"
                    type="text"
                    placeholder="token-xxxxx-xxxxx"
                    className="pl-9"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Validando..." : "Entrar"}
              </Button>
            </form>

            <div className="space-y-3 mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="border-t w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Como funciona</span>
                </div>
              </div>

              <div className="space-y-2 text-muted-foreground text-sm">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Envie sua intenção de participação</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>Aguarde a aprovação do administrador</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Receba o token por e-mail e faça login aqui</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Complete seu cadastro completo</span>
                </p>
              </div>

              <Button asChild variant="outline" className="bg-transparent w-full">
                <Link href="/intencao">Ainda não tem conta? Manifestar interesse</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
