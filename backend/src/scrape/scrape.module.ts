import { Module } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ScrapeService],
  exports: [ScrapeService],
})
export class ScrapeModule {}
