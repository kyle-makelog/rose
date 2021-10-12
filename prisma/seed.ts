import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const dan = await prisma.person.upsert({
    where: { email: "dan@makelog.io" },
    update: {},
    create: {
      email: "dan@makelog.io",
      name: "Dan",
      avatarURL: "https://makelog.com/people/dan.jpeg",
    },
  });
  const jj = await prisma.person.upsert({
    where: { email: "jj@makelog.io" },
    update: {},
    create: {
      email: "jj@makelog.io",
      name: "JJ",
      avatarURL: "https://makelog.com/people/jj.jpeg",
    },
  });
  const kyle = await prisma.person.upsert({
    where: { email: "kyle@makelog.io" },
    update: {},
    create: {
      email: "kyle@makelog.io",
      name: "Kyle",
      avatarURL: "https://makelog.com/people/kyle.jpeg",
    },
  });
  const vince = await prisma.person.upsert({
    where: { email: "vince@makelog.io" },
    update: {},
    create: {
      email: "vince@makelog.io",
      name: "Vince",
      avatarURL: "https://makelog.com/people/vince.jpeg",
    },
  });

  const org = await prisma.organization.create({
    data: { name: "Makelog" },
  });

  const web = await prisma.project.create({
    data: {
      name: "web",
      organization: { connect: { id: org.id } },
    },
  });
  const maked = await prisma.project.create({
    data: {
      name: "maked",
      organization: { connect: { id: org.id } },
    },
  });

  await prisma.update.create({
    data: {
      name: "Update One",
      content: "This is the first Update",

      authors: {
        connect: [
          { email: dan.email },
          { email: jj.email },
          { email: kyle.email },
        ],
      },
      organization: { connect: { id: org.id } },
      project: { connect: { id: web.id } },
    },
  });

  await prisma.update.create({
    data: {
      name: "Update Two",
      content: "This is the second Update",

      authors: {
        connect: [{ email: vince.email }],
      },
      organization: { connect: { id: org.id } },
      project: { connect: { id: maked.id } },
    },
  });

  await prisma.update.create({
    data: {
      name: "Update Three",
      content: "This is the third Update",

      authors: {
        connect: [{ email: dan.email }],
      },
      organization: { connect: { id: org.id } },
      project: { connect: { id: web.id } },
    },
  });

  await prisma.update.create({
    data: {
      name: "Update Four",
      content: "This is the Fourth Update",

      authors: {
        connect: [{ email: kyle.email }],
      },
      organization: { connect: { id: org.id } },
      project: { connect: { id: web.id } },
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
