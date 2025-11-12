"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserPlus, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

type Indicacao = {
  id: string
  membroIndicado: string
  empresaContato: string
  descricao: string
  status: "nova" | "em-analise" | "realizada"
  data: string
  tipo: "feita" | "recebida"
}

export default function IndicacoesPage() {
  const [indicacoes, setIndicacoes] = useState<Indicacao[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    membroIndicado: "",
    empresaContato: "",
    descricao: "",
  })

  useEffect(() => {
    const stored = localStorage.getItem("indicacoes")
    if (stored) {
      setIndicacoes(JSON.parse(stored))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const novaIndicacao: Indicacao = {
        id: Date.now().toString(),
        ...formData,
        status: "nova",
        data: new Date().toISOString(),
        tipo: "feita",
      }

      const updated = [...indicacoes, novaIndicacao]
      setIndicacoes(updated)
      localStorage.setItem("indicacoes", JSON.stringify(updated))

      console.log("[v0] Nova indicação criada:", novaIndicacao)

      setFormData({ membroIndicado: "", empresaContato: "", descricao: "" })
      setLoading(false)
      alert("✅ Indicação registrada com sucesso!")
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nova":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/20">
            Nova
          </Badge>
        )
      case "em-analise":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
            Em Análise
          </Badge>
        )
      case "realizada":
        return <Badge className="bg-accent text-accent-foreground">Realizada</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "nova":
        return <UserPlus className="w-4 h-4" />
      case "em-analise":
        return <Clock className="w-4 h-4" />
      case "realizada":
        return <TrendingUp className="w-4 h-4" />
      default:
        return null
    }
  }

  const indicacoesFeitas = indicacoes.filter((i) => i.tipo === "feita")
  const indicacoesRecebidas = indicacoes.filter((i) => i.tipo === "recebida")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Sistema de Indicações</h1>
            <p className="text-muted-foreground">Indique novos membros e acompanhe suas indicações</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Formulário de Nova Indicação */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Nova Indicação
                </CardTitle>
                <CardDescription>Preencha os dados do membro que você deseja indicar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="membroIndicado">Membro Indicado *</Label>
                    <Input
                      id="membroIndicado"
                      placeholder="Nome do membro"
                      required
                      value={formData.membroIndicado}
                      onChange={(e) => setFormData({ ...formData, membroIndicado: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="empresaContato">Empresa / Contato *</Label>
                    <Input
                      id="empresaContato"
                      placeholder="Empresa e informações de contato"
                      required
                      value={formData.empresaContato}
                      onChange={(e) => setFormData({ ...formData, empresaContato: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição da Oportunidade *</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva a oportunidade e contexto da indicação..."
                      required
                      rows={4}
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar Indicação"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <div className="space-y-4">
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Indicações Feitas</span>
                    <span className="text-2xl font-bold text-primary">{indicacoesFeitas.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Indicações Recebidas</span>
                    <span className="text-2xl font-bold text-secondary">{indicacoesRecebidas.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Realizadas</span>
                    <span className="text-2xl font-bold text-accent">
                      {indicacoes.filter((i) => i.status === "realizada").length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dica</h3>
                      <p className="text-sm text-muted-foreground">
                        Indicações de qualidade fortalecem a rede e aumentam suas chances de networking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Lista de Indicações */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Minhas Indicações</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="feitas" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="feitas">Feitas ({indicacoesFeitas.length})</TabsTrigger>
                  <TabsTrigger value="recebidas">Recebidas ({indicacoesRecebidas.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="feitas" className="space-y-4 mt-6">
                  {indicacoesFeitas.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Você ainda não fez nenhuma indicação.</p>
                  ) : (
                    indicacoesFeitas.map((indicacao) => (
                      <Card key={indicacao.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{indicacao.membroIndicado}</h3>
                              <p className="text-sm text-muted-foreground">{indicacao.empresaContato}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(indicacao.status)}
                              {getStatusBadge(indicacao.status)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{indicacao.descricao}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(indicacao.data).toLocaleString("pt-BR")}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="recebidas" className="space-y-4 mt-6">
                  {indicacoesRecebidas.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Você ainda não recebeu nenhuma indicação.</p>
                  ) : (
                    indicacoesRecebidas.map((indicacao) => (
                      <Card key={indicacao.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{indicacao.membroIndicado}</h3>
                              <p className="text-sm text-muted-foreground">{indicacao.empresaContato}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(indicacao.status)}
                              {getStatusBadge(indicacao.status)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{indicacao.descricao}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(indicacao.data).toLocaleString("pt-BR")}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
