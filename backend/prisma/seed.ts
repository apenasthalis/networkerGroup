import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.admin.create({
    data: {
      name: "Administrador",
      email: "admin@networking.com",
      password: "123abc",
    },
  });

  console.log("Admin criado:", admin);

  const intention = await prisma.intention.create({
    data: {
      business_name: "Empresa XPTO",
      email: "contato@xpto.com",
      reason_participation: "Networking de negócios locais",
      members: {
        create: [
          { phone: "11999999999", is_active: true },
          { phone: "11988888888", is_active: false },
        ],
      },
    },
    include: { members: true },
  });

  console.log("Intention criada:", intention);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
