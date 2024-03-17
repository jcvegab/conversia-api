import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const generateUser = (): Prisma.UserCreateManyInput => {
  return {
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    password: faker.internet.password(),
    imageUrl: faker.datatype.boolean() ? faker.image.avatar() : null,
  };
};

async function main() {
  console.log('Creating users...');
  const users = faker.helpers.multiple(generateUser, { count: 200 });
  await prisma.user.createMany({
    data: users,
  });
  console.log('Users created!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
