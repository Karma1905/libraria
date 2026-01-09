import { PlaywrightCrawler } from 'crawlee';

export function categoryCrawler(
  onData: (items: { title: string; url: string }[]) => Promise<void>,
) {
  return new PlaywrightCrawler({
    maxRequestsPerMinute: 1,
    requestHandlerTimeoutSecs: 120,

    launchContext: {
      launchOptions: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      },
    },

    async requestHandler({ page, request }) {
      await page.goto(request.url, {
        waitUntil: 'domcontentloaded',
        timeout: 120_000,
      });

      await page.waitForTimeout(4_000);

      const categories = await page.$$eval('a[href^="/books/"]', (links) =>
        links
          .map((a) => ({
            title: a.textContent?.trim(),
            url: a.getAttribute('href'),
          }))
          .filter(
            (c): c is { title: string; url: string } =>
              !!c.title &&
              !!c.url &&
              c.url.split('/').filter(Boolean).length === 2,
          ),
      );

      if (categories.length === 0) {
        console.warn('No categories found!');
      } else {
        console.log('Categories found:', categories.length);
      }

      await onData(categories);
    },
  });
}
