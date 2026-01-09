import { PlaywrightCrawler } from 'crawlee';

export function navigationCrawler(
  onData: (items: { title: string; url: string }[]) => Promise<void>,
) {
  return new PlaywrightCrawler({
    maxRequestsPerMinute: 2, // Respect robots.txt [cite: 54, 55]
    requestHandlerTimeoutSecs: 180, // Increased to handle slow response times
    maxRequestRetries: 3,

    async requestHandler({ page, request, log }) {
      log.info(`Processing ${request.url}...`);

      // Set a realistic browser header to avoid bot detection [cite: 53]
      await page.setExtraHTTPHeaders({
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      });

      // Use 'domcontentloaded' to bypass slow-loading external scripts [cite: 39]
      await page.goto(request.url, {
        waitUntil: 'domcontentloaded',
        timeout: 90000,
      });

      // Brief pause for the dynamic menu to render
      await page.waitForTimeout(5000);

      const items = await page.$$eval(
        'a[href*="/category/"], a[href*="/books/"]',
        (links) =>
          links
            .map((a) => ({
              title: a.textContent?.trim() || '',
              url: a.getAttribute('href') || '',
            }))
            .filter((i) => i.title.length > 2 && i.url.length > 0),
      );

      const uniqueItems = Array.from(
        new Map(items.map((item) => [item.title, item])).values(),
      );

      if (uniqueItems.length === 0) {
        log.warning('No items found. The site may be blocking the request.');
      } else {
        log.info(`Successfully found ${uniqueItems.length} navigation items.`);
        await onData(uniqueItems);
      }
    },
  });
}
