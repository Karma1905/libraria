import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { navigationCrawler } from './crawlers/navigation.crawler';
import { categoryCrawler } from './crawlers/category.crawler';
import { productListCrawler } from './crawlers/product-list.crawler';

@Injectable()
export class ScrapeService {
  constructor(private prisma: PrismaService) {}

  // ---------------- NAVIGATION ----------------
  async scrapeNavigation() {
    const navigations: { id: number }[] = [];

    const crawler = navigationCrawler(async (items) => {
      for (const item of items) {
        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const nav = await this.prisma.navigation.upsert({
          where: { slug },
          update: {},
          create: {
            title: item.title,
            slug,
          },
        });

        navigations.push({ id: nav.id });
      }
    });

    await crawler.run(['https://www.worldofbooks.com/']);
    return navigations;
  }

  // ---------------- CATEGORIES (FIXED) ----------------
  async scrapeCategories(navigationId: number) {
    const crawler = categoryCrawler(async (items) => {
      for (const item of items) {
        if (!item.url.startsWith('/books/')) continue;

        const slug = item.url.replace('/books/', '').split('/')[0];

        const exists = await this.prisma.category.findUnique({
          where: {
            navigationId_slug: {
              navigationId,
              slug,
            },
          },
        });

        if (exists) continue;

        await this.prisma.category.create({
          data: {
            title: item.title,
            slug,
            navigationId,
          },
        });
      }
    });

    // SINGLE stable category hub
    await crawler.run(['https://www.worldofbooks.com/books']);
  }

  // ---------------- PRODUCTS ----------------
  async scrapeProducts(categoryId: number, categoryUrl: string) {
    const crawler = productListCrawler(async (items) => {
      for (const item of items) {
        const sourceId = item.productUrl.split('/').pop();
        if (!sourceId) continue;

        const sourceUrl = item.productUrl.startsWith('http')
          ? item.productUrl
          : `https://www.worldofbooks.com${item.productUrl}`;

        await this.prisma.product.upsert({
          where: { sourceId },
          update: {
            price: item.price,
          },
          create: {
            sourceId,
            sourceUrl,
            title: item.title,
            author: item.author,
            price: item.price,
            currency: 'GBP',
            imageUrl: item.imageUrl,
            categoryId,
          },
        });
      }
    });

    await crawler.run([categoryUrl]);
  }
}
