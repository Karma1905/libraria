import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ---------- NAVIGATION ----------
  const booksNav = await prisma.navigation.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      title: 'Books',
      slug: 'books',
    },
  });

  // ---------- CATEGORIES ----------
  await prisma.category.createMany({
    data: [
      { title: 'Fiction', slug: 'fiction', navigationId: booksNav.id },
      { title: 'Non-Fiction', slug: 'non-fiction', navigationId: booksNav.id },
      { title: 'Science', slug: 'science', navigationId: booksNav.id },
      { title: 'Technology', slug: 'technology', navigationId: booksNav.id },
    ],
    skipDuplicates: true,
  });

  const allCategories = await prisma.category.findMany();

  // ---------- PRODUCTS ----------
  await prisma.product.createMany({
    data: allCategories.flatMap((category) => [
      {
        title: `Sample Book 1 (${category.title})`,
        author: 'John Doe',
        price: 9.99,
        currency: 'GBP',
        imageUrl: '/images/book-placeholder.jpg',
        sourceId: `${category.slug}-1`,
        sourceUrl: '',
        categoryId: category.id,
      },
      {
        title: `Sample Book 2 (${category.title})`,
        author: 'Jane Smith',
        price: 14.99,
        currency: 'GBP',
        imageUrl: '/images/book-placeholder.jpg',
        sourceId: `${category.slug}-2`,
        sourceUrl: '',
        categoryId: category.id,
      },
    ]),
    skipDuplicates: true,
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
