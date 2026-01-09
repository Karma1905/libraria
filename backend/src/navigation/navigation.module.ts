import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { ScrapeModule } from '../scrape/scrape.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ScrapeModule, DatabaseModule],
  controllers: [NavigationController],
  providers: [NavigationService],
})
export class NavigationModule {}
