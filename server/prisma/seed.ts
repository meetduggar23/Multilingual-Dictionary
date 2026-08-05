import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@dictionary.ai';
  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    const passwordHash = await bcrypt.hash('demo1234', 10);
    await prisma.user.create({
      data: { name: 'Demo User', email, passwordHash },
    });
    console.log('Seeded demo user: demo@dictionary.ai / demo1234');
  } else {
    console.log('Demo user already exists, skipping.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
