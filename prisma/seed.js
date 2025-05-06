const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("123456", 10);
  await prisma.user.createMany({
    data: [
      { name: "admin", email: "doougmooraes2024@gmail.com", passwordHash: Voyageturbo13, role: "PRODUCER" },
      { name: "Bob",   email: "bob@ex.com",   passwordHash: hash, role: "CONSUMER" }
    ]
  });
  console.log("🌱 Seed concluído");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
