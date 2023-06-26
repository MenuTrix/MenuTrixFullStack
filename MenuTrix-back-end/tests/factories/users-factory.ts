import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';

type UserBody = Partial<User> & { repeatPassword?: string };

export async function createUser(params: UserBody = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password();
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      cpf: params.cpf || '11111111111',
      name: params.name || faker.fake.name,
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}