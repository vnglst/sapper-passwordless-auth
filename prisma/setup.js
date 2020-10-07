const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function up() {
  await prisma.$queryRaw`
        CREATE TABLE "public"."User" (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL
        );
    `;

  await prisma.$queryRaw`
        CREATE TABLE "public"."Profile" (
            id SERIAL PRIMARY KEY NOT NULL,
            bio TEXT,
            "userId" INTEGER UNIQUE NOT NULL,
            FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
        );
    `;
}

async function down() {
  await prisma.$queryRaw`
    DROP TABLE "public"."Profile";
`;

  await prisma.$queryRaw`
        DROP TABLE "public"."User";
    `;
}

// up()
down()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
