const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

async function up(prisma) {
  await prisma.$queryRaw`
        CREATE TABLE "public"."User" (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(255) UNIQUE NOT NULL,
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

async function down(prisma) {
  await prisma.$queryRaw`
    DROP TABLE "public"."Profile";
`;

  await prisma.$queryRaw`
    DROP TABLE "public"."User";
  `;
}

module.exports = {
  up,
  down,
  prisma,
};
