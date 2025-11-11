import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, UserPlus, LogIn } from "lucide-react"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="mx-auto px-4 py-16 container">
        <div className="space-y-8 mx-auto max-w-4xl text-center">
          <div className="space-y-4">
            <h1 className="font-bold text-5xl text-balance tracking-tight">Networker Group</h1>
            <p className="text-muted-foreground text-xl text-pretty">Sistema de Admissão de Membros</p>
          </div>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mt-12">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-center items-center bg-primary/10 mx-auto rounded-lg w-12 h-12">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Manifestar Interesse</h3>
                <p className="text-muted-foreground text-sm">
                  Envie sua intenção de participação preenchendo o formulário público
                </p>
                <Button asChild className="w-full">
                  <Link href="/intencao">Começar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-center items-center bg-primary/10 mx-auto rounded-lg w-12 h-12">
                  <LogIn className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Login de Membro</h3>
                <p className="text-muted-foreground text-sm">Acesse com seu token para completar seu cadastro</p>
                <Button asChild className="w-full">
                  <Link href="/login">Fazer Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-center items-center bg-secondary/10 mx-auto rounded-lg w-12 h-12">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Área do Administrador</h3>
                <p className="text-muted-foreground text-sm">Gerencie intenções, aprove ou recuse solicitações</p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/admin">Acessar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-center items-center bg-accent/10 mx-auto rounded-lg w-12 h-12">
                  <UserPlus className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Sistema de Indicações</h3>
                <p className="text-muted-foreground text-sm">Indique novos membros e acompanhe suas indicações</p>
                <Button asChild variant="outline" className="bg-transparent w-full">
                  <Link href="/indicacoes">Ver Indicações</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
