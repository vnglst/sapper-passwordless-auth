const { prisma, down } = require("./setup");

down(prisma)
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
