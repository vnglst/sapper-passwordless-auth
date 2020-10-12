const { prisma } = require("./setup");

async function down() {
  await prisma.user.deleteMany({});
}

down()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
