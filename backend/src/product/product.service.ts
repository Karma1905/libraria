import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Product, ViewHistory } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Records a product view in the database.
   * Fulfills Requirement 21 & 65: Persist navigation history.
   */
  async trackView(productId: number, path: string): Promise<ViewHistory> {
    return this.prisma.viewHistory.create({
      data: {
        productId: productId,
        pathJson: path,
        sessionId: 'anonymous-session',
      },
    });
  }

  /**
   * Retrieves the most recently viewed products.
   * Returns an array of Products with their details.
   */
  async getRecentHistory(limit: number): Promise<Product[]> {
    const history = await this.prisma.viewHistory.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          include: { detail: true },
        },
      },
    });

    // Extracting the nested product object and casting to fix "Unsafe return"
    return history.map((h) => h.product) as Product[];
  }

  async findAll(limit: number = 8): Promise<Product[]> {
    return this.prisma.product.findMany({
      take: limit,
      orderBy: { lastScrapedAt: 'desc' },
      include: { detail: true },
    });
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { categoryId },
      include: { detail: true },
    });
  }

  async getOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { detail: true, reviews: true, category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}