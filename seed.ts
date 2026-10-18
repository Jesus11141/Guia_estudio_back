import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'hidalgo11141@gmail.com';
  
  // Usamos upsert para que si ya existe, solo actualice el rol
  const superAdmin = await prisma.user.upsert({
    where: { email },
    update: {
      role: 'SUPER_ADMIN',
      password: '123456',
    },
    create: {
      email,
      password: '123456',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Súper Administrador inyectado:', superAdmin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
