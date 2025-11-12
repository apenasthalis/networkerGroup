"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

function CadastroForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [tokenValido, setTokenValido] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    linkedin: "",
    cargo: "",
  })

  useEffect(() => {
    if (!token) {
      setTokenValido(false)
      return
    }

    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}")
    if (tokens[token] && !tokens[token].usado) {
      setTokenValido(true)
    } else {
      setTokenValido(false)
    }
  }, [token])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const tokens = JSON.parse(localStorage.getItem("tokens") || "{}")
      if (token && tokens[token]) {
        tokens[token].usado = true
        localStorage.setItem("tokens", JSON.stringify(tokens))

        const cadastros = JSON.parse(localStorage.getItem("cadastros") || "[]")
        cadastros.push({
          token,
          ...formData,
          dataCadastro: new Date().toISOString(),
        })
        localStorage.setItem("cadastros", JSON.stringify(cadastros))

        console.log("[v0] Cadastro completo salvo:", { token, ...formData })
      }

      setLoading(false)
      alert("🎉 Cadastro completo realizado com sucesso!")
      router.push("/")
    }, 1500)
  }

  if (tokenValido === null) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Validando token...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tokenValido) {
    return (
      <div className="bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
        <div className="mx-auto px-4 max-w-2xl container">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Voltar
            </Link>
          </Button>

          <Card className="border-2 border-destructive">
            <CardHeader>
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-destructive" />
                <div>
                  <CardTitle className="text-2xl">Token Inválido</CardTitle>
                  <CardDescription>O token de convite é inválido ou já foi utilizado.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  Por favor, verifique o link enviado por e-mail ou entre em contato com o administrador.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
      <div className="mx-auto px-4 max-w-3xl container">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Link>
        </Button>

        <Card className="border-2">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-accent" />
              <div>
                <CardTitle className="font-bold text-3xl">Cadastro Completo</CardTitle>
                <CardDescription className="text-base">
                  Parabéns! Sua intenção foi aprovada. Complete seu cadastro abaixo.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="gap-4 grid md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    required
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo Atual *</Label>
                  <Input
                    id="cargo"
                    placeholder="Seu cargo"
                    required
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  placeholder="Rua, número, complemento"
                  required
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </div>

              <div className="gap-4 grid md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    placeholder="Sua cidade"
                    required
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Input
                    id="estado"
                    placeholder="UF"
                    maxLength={2}
                    required
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value.toUpperCase() })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    placeholder="00000-000"
                    required
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/seu-perfil"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Finalizando..." : "Finalizar Cadastro"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function CadastroPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CadastroForm />
    </Suspense>
  )
}
