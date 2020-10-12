const { prisma } = require("./setup");
const { users } = require("./seedData");

async function up() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

up()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
