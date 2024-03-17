import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { FindAllArgs } from './dto/find-all.input';

@Injectable()
export class UsersService {
  constructor(readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const password = await bcrypt.hash(createUserInput.password, 10);
    return this.prismaService.user.create({
      data: { ...createUserInput, password },
    });
  }

  findAll({ limit, offset }: FindAllArgs) {
    return this.prismaService.user.findMany({
      take: limit,
      skip: offset,
      // TODO: Order by - { [keyof User]: 'asc' | 'desc' }
      orderBy: { createdAt: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async finOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
