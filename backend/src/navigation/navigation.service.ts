import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ScrapeService } from '../scrape/scrape.service';

@Injectable()
export class NavigationService {
  constructor(
    private prisma: PrismaService,
    private scrapeService: ScrapeService,
  ) {}

  async getNavigation() {
    return this.prisma.navigation.findMany();
  }

  async scrapeAndStoreNavigation() {
    const navigations = await this.scrapeService.scrapeNavigation();

    // Create categories for each navigation
    for (const nav of navigations) {
      await this.scrapeService.scrapeCategories(nav.id);
    }

    return { status: 'Navigation & categories created' };
  }
}
