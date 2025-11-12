"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { api } from "@/services/api" // Import the api service
import { toast } from "sonner"

function CadastroCompletoForm() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [tokenValido, setTokenValido] = useState<boolean | null>(null)
  const [intencaoData, setIntencaoData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    linkedin: "",
    cargo: "",
    dataNascimento: "",
    cpf: "",
    formacao: "",
    experiencia: "",
  })

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken")

    if (!userToken) {
      setTokenValido(false)
      return
    }

    setToken(userToken)

    const validateTokenAndFetchData = async () => {
      try {
        const response = await api.post('/auth/validate-token', { token: userToken });
        if (response.status === 200 && response.data.member) {
          setTokenValido(true);
          setIntencaoData({
            nome: response.data.member.name,
            email: response.data.member.email,
            empresa: response.data.member.business_name,
          });
        } else {
          sessionStorage.removeItem("userToken");
          setTokenValido(false);
        }
      } catch (error) {
        console.error("Erro ao validar token no cadastro completo:", error);
        sessionStorage.removeItem("userToken");
        setTokenValido(false);
      }
    };

    validateTokenAndFetchData();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!token) {
      toast.error("Token de acesso não encontrado. Faça login novamente.");
      setLoading(false);
      router.push("/login");
      return;
    }

    try {
      const response = await api.put(`/member/complete-registration`, {
        token,
        ...formData,
      });

      if (response.status === 200) {
        toast.success("Cadastro completo realizado com sucesso!");
        sessionStorage.removeItem("userToken");
        router.push("/");
      } else {
        toast.error("Erro ao finalizar cadastro. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro ao finalizar cadastro:", error);
      toast.error(error.response?.data?.error || "Erro ao finalizar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (tokenValido === null) {
    return (
      <div className="flex justify-center items-center bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Validando acesso...</p>
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
                  <CardTitle className="text-2xl">Acesso Negado</CardTitle>
                  <CardDescription>Você precisa fazer login com um token válido.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>Faça login com o token enviado por e-mail após sua aprovação.</AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/login">Ir para Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 py-12 min-h-screen">
      <div className="mx-auto px-4 max-w-4xl container">
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
                  Parabéns, {intencaoData?.nome}! Sua intenção foi aprovada. Complete seu cadastro abaixo.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {intencaoData && (
              <Alert className="bg-muted/50 mb-6">
                <AlertDescription>
                  <p className="mb-2 font-semibold">Dados da sua intenção:</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Nome:</strong> {intencaoData.nome}
                    </p>
                    <p>
                      <strong>Email:</strong> {intencaoData.email}
                    </p>
                    <p>
                      <strong>Empresa:</strong> {intencaoData.empresa}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Dados Pessoais</h3>

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
                    <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      required
                      value={formData.dataNascimento}
                      onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    required
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Endereço</h3>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo *</Label>
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
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Informações Profissionais</h3>

                <div className="gap-4 grid md:grid-cols-2">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formacao">Formação Acadêmica *</Label>
                  <Textarea
                    id="formacao"
                    placeholder="Descreva sua formação acadêmica (graduação, pós-graduação, cursos)"
                    required
                    rows={3}
                    value={formData.formacao}
                    onChange={(e) => setFormData({ ...formData, formacao: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experiencia">Experiência Profissional *</Label>
                  <Textarea
                    id="experiencia"
                    placeholder="Descreva brevemente sua experiência profissional"
                    required
                    rows={4}
                    value={formData.experiencia}
                    onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                  />
                </div>
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

export default function CadastroCompletoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CadastroCompletoForm />
    </Suspense>
  )
}
