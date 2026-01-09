import { Module } from '@nestjs/common';
import { NavigationModule } from './navigation/navigation.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ReviewModule } from './review/review.module';
import { ScrapeModule } from './scrape/scrape.module';
import { ScrapeJobModule } from './scrape-job/scrape-job.module';
import { ViewHistoryModule } from './view-history/view-history.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    NavigationModule,
    CategoryModule,
    ProductModule,
    ProductDetailModule,
    ReviewModule,
    ScrapeModule,
    ScrapeJobModule,
    ViewHistoryModule,
    DatabaseModule,
    CommonModule,
  ],
})
export class AppModule {}
