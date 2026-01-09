import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(navigationId?: number) {
    return this.prisma.category.findMany({
      where: navigationId ? { navigationId } : undefined,
      orderBy: { createdAt: 'asc' },
    });
  }
}
