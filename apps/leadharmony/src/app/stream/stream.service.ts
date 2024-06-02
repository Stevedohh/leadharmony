import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StreamService {
  constructor(private readonly _prismaService: PrismaService) {
  }

  async createStream(data: Prisma.StreamCreateInput) {
    return this._prismaService.stream.create({ data });
  }

  async getStreams() {
    return this._prismaService.stream.findMany();
  }

  async getStreamById(id: number) {
    return this._prismaService.stream.findUnique({
      where: { id }
    });
  }

  async updateStream(id: number, data: Prisma.StreamUpdateInput) {
    return this._prismaService.stream.update({
      where: { id },
      data
    });
  }

  async deleteStream(id: number) {
    return this._prismaService.stream.delete({
      where: { id }
    });
  }
}
