const { prisma, up } = require("./setup");

up(prisma)
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
