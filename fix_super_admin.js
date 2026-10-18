const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient();
  const hash = await bcrypt.hash('123456', 10);
  
  await prisma.user.updateMany({
    data: { password: hash }
  });
  
  console.log('Todos los usuarios tienen contraseña 123456 (encriptada)');
  
  // Asegurarse de que exista el super admin
  await prisma.user.upsert({
    where: { email: 'hidalgo11141@gmail.com' },
    update: { password: hash, role: 'SUPER_ADMIN' },
    create: { email: 'hidalgo11141@gmail.com', password: hash, role: 'SUPER_ADMIN' }
  });
  
  console.log('Super Admin garantizado');
  await prisma.$disconnect();
}
main().catch(console.error);
