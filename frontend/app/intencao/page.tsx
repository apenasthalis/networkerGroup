"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { usePostIntention } from "@/hooks/usePostIntention"

export default function IntencaoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    business_name: "",
    email: "",
    reason_participation: "",
  });

  const { mutate, isPending } = usePostIntention();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(formData, {
      onSuccess: () => {
        console.log("Intenção inserida com sucesso!");
        alert("Intenção enviada com sucesso! Aguarde análise do administrador.");
        router.push("/");
      },
      onError: (error: Error) => {
        console.error("Erro ao inserir Intenção", error);
        alert("Ocorreu um erro ao enviar a intenção.");
      },
    });
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
      <div className="mx-auto px-4 max-w-2xl container">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Link>
        </Button>

        <Card className="border-2">
          <CardHeader className="space-y-2">
            <CardTitle className="font-bold text-3xl">Manifestar Interesse</CardTitle>
            <CardDescription className="text-base">
              Preencha o formulário abaixo para manifestar seu interesse em participar. Sua solicitação será analisada
              pelo nosso time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome completo"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa *</Label>
                <Input
                  id="empresa"
                  placeholder="Nome da sua empresa"
                  required
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivo">Por que você quer participar? *</Label>
                <Textarea
                  id="motivo"
                  placeholder="Conte-nos sobre suas motivações e expectativas..."
                  required
                  rows={5}
                  value={formData.reason_participation}
                  onChange={(e) => setFormData({ ...formData, reason_participation: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Enviar Intenção
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}