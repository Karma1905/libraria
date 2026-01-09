import { Controller, Get, Post } from '@nestjs/common';
import { NavigationService } from './navigation.service';

@Controller('navigation')
export class NavigationController {
  constructor(private navigationService: NavigationService) {}

  @Get()
  getAll() {
    return this.navigationService.getNavigation();
  }

  @Post('scrape')
  scrape() {
    return this.navigationService.scrapeAndStoreNavigation();
  }
}
