const { PrismaClient } = require("@prisma/client");
const { users } = require("./seedData");

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function up() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

async function down() {
  await prisma.user.deleteMany({});
}

up()
  // down()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
