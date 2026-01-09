import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@Query('navigationId') navigationId?: string) {
    return this.categoryService.getAll(
      navigationId ? Number(navigationId) : undefined,
    );
  }
}
