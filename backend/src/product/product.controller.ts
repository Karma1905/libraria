import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, ViewHistory } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query('limit') limit?: string): Promise<Product[]> {
    return this.productService.findAll(Number(limit) || 20);
  }

  @Get('history')
  async getHistory(@Query('limit') limit?: string): Promise<Product[]> {
    return this.productService.getRecentHistory(Number(limit) || 4);
  }

  @Get('category/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.getByCategory(Number(categoryId));
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getOne(Number(id));
  }

  @Post(':id/view')
  async trackView(
    @Param('id') id: string,
    @Body('path') path: string,
  ): Promise<ViewHistory> {
    return this.productService.trackView(Number(id), path);
  }
}
