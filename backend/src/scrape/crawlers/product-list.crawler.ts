import { PlaywrightCrawler } from 'crawlee';

export function productListCrawler(
  onData: (
    items: {
      title: string;
      author?: string;
      price: number;
      imageUrl?: string;
      productUrl: string;
    }[],
  ) => Promise<void>,
) {
  return new PlaywrightCrawler({
    maxRequestsPerMinute: 6,
    requestHandlerTimeoutSecs: 60,

    async requestHandler({ page, request }) {
      await page.goto(request.url, { waitUntil: 'domcontentloaded' });

      const products = await page.$$eval('article', (cards) =>
        cards
          .map((card) => {
            const titleEl = card.querySelector('h2, h3');
            const authorEl = card.querySelector('[class*="author"]');
            const priceEl = card.querySelector('[class*="price"]');
            const linkEl = card.querySelector('a');
            const imgEl = card.querySelector('img');

            const title = titleEl?.textContent?.trim();
            const author = authorEl?.textContent?.trim();

            const priceText = priceEl?.textContent || '';
            const priceValue = priceText.replace(/[^0-9.]/g, '');
            const price = priceValue ? Number(priceValue) : null;

            const productUrl = linkEl?.getAttribute('href');
            const imageUrl = imgEl?.src;

            if (!title || !price || !productUrl) return null;

            return {
              title,
              author,
              price,
              imageUrl,
              productUrl,
            };
          })
          .filter(
            (
              p,
            ): p is {
              title: string;
              price: number;
              productUrl: string;
              author: string | undefined;
              imageUrl: string | undefined;
            } => Boolean(p),
          ),
      );

      await onData(products);
    },
  });
}
