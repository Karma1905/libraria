export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  longDescription: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  isbn: string;
  publisher: string;
  publishDate: string;
  pages: number;
  language: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 16.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    description: 'A dazzling novel about all the choices that go into a life well lived.',
    longDescription: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets? A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time.',
    categoryId: '1',
    rating: 4.5,
    reviewCount: 2847,
    isbn: '978-0525559474',
    publisher: 'Viking',
    publishDate: '2020-09-29',
    pages: 304,
    language: 'English',
    inStock: true,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
    longDescription: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    categoryId: '11',
    rating: 4.8,
    reviewCount: 12543,
    isbn: '978-0735211292',
    publisher: 'Avery',
    publishDate: '2018-10-16',
    pages: 320,
    language: 'English',
    inStock: true,
  },
  {
    id: '3',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=600&fit=crop',
    description: 'A timeless picture book about imagination and adventure.',
    longDescription: 'Max, a wild and naughty boy, is sent to bed without his supper. His room transforms into a jungle and he sails away to an island full of Wild Things. They make Max their king, but after a while he begins to feel lonely. A timeless story that captures the essence of childhood imagination.',
    categoryId: '12',
    rating: 4.9,
    reviewCount: 8934,
    isbn: '978-0060254926',
    publisher: 'HarperCollins',
    publishDate: '1963-04-09',
    pages: 48,
    language: 'English',
    inStock: true,
  },
  {
    id: '4',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 17.99,
    originalPrice: 26.99,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    description: 'A shocking psychological thriller of a woman\'s act of violence.',
    longDescription: 'Alicia Berenson\'s life is seemingly perfect. Until one evening, her husband Gabriel returns home late from his fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word. Her refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander.',
    categoryId: '4',
    rating: 4.3,
    reviewCount: 5621,
    isbn: '978-1250301697',
    publisher: 'Celadon Books',
    publishDate: '2019-02-05',
    pages: 336,
    language: 'English',
    inStock: true,
  },
  {
    id: '5',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=600&fit=crop',
    description: 'A romantic novel of manners set in Georgian England.',
    longDescription: 'The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency. Elizabeth is the second of five daughters of a country gentleman living near the fictional town of Meryton in Hertfordshire.',
    categoryId: '5',
    rating: 4.7,
    reviewCount: 15234,
    isbn: '978-0141439518',
    publisher: 'Penguin Classics',
    publishDate: '1813-01-28',
    pages: 432,
    language: 'English',
    inStock: true,
  },
  {
    id: '6',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop',
    description: 'The greatest science fiction novel of all time.',
    longDescription: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and expanding consciousness. A stunning blend of adventure and mysticism.',
    categoryId: '6',
    rating: 4.6,
    reviewCount: 9876,
    isbn: '978-0441172719',
    publisher: 'Ace',
    publishDate: '1965-08-01',
    pages: 688,
    language: 'English',
    inStock: true,
  },
  {
    id: '7',
    title: 'Educated',
    author: 'Tara Westover',
    price: 15.99,
    originalPrice: 22.00,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop',
    description: 'A memoir about family, learning, and self-invention.',
    longDescription: 'Tara Westover was seventeen the first time she set foot in a classroom. Born to survivalists in the mountains of Idaho, she prepared for the end of the world by stockpiling home-canned peaches and sleeping with her "head-for-the-hills" bag. Her stunning memoir is about the shaping of a mind.',
    categoryId: '10',
    rating: 4.7,
    reviewCount: 7654,
    isbn: '978-0399590504',
    publisher: 'Random House',
    publishDate: '2018-02-20',
    pages: 352,
    language: 'English',
    inStock: true,
  },
  {
    id: '8',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
    description: 'A beloved classic for the very young.',
    longDescription: 'THE all-time classic picture book, from generation to generation, sold somewhere in the world every 30 seconds! A tiny caterpillar eats his way through a week of food before emerging as a beautiful butterfly.',
    categoryId: '12',
    rating: 4.9,
    reviewCount: 23456,
    isbn: '978-0399226908',
    publisher: 'World of Eric Carle',
    publishDate: '1969-06-03',
    pages: 26,
    language: 'English',
    inStock: true,
  },
  {
    id: '9',
    title: 'All the Light We Cannot See',
    author: 'Anthony Doerr',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=600&fit=crop',
    description: 'Winner of the Pulitzer Prize for Fiction.',
    longDescription: 'Marie-Laure lives in Paris near the Museum of Natural History, where her father works. When she is twelve, the Nazis occupy Paris and father and daughter flee to the walled citadel of Saint-Malo, where Marie-Laure\'s reclusive great uncle lives in a tall house by the sea.',
    categoryId: '8',
    rating: 4.6,
    reviewCount: 6789,
    isbn: '978-1501173219',
    publisher: 'Scribner',
    publishDate: '2014-05-06',
    pages: 544,
    language: 'English',
    inStock: true,
  },
  {
    id: '10',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=600&fit=crop',
    description: 'A thrilling young adult dystopian adventure.',
    longDescription: 'In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games.',
    categoryId: '13',
    rating: 4.5,
    reviewCount: 18765,
    isbn: '978-0439023528',
    publisher: 'Scholastic Press',
    publishDate: '2008-09-14',
    pages: 374,
    language: 'English',
    inStock: true,
  },
  {
    id: '11',
    title: 'Becoming',
    author: 'Michelle Obama',
    price: 19.99,
    originalPrice: 32.50,
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
    description: 'An intimate, powerful memoir by the former First Lady.',
    longDescription: 'In a life filled with meaning and accomplishment, Michelle Obama has emerged as one of the most iconic and compelling women of our era. As First Lady, she helped create the most welcoming and inclusive White House in history, while also establishing herself as a powerful advocate for women and girls.',
    categoryId: '10',
    rating: 4.8,
    reviewCount: 11234,
    isbn: '978-1524763138',
    publisher: 'Crown',
    publishDate: '2018-11-13',
    pages: 448,
    language: 'English',
    inStock: true,
  },
  {
    id: '12',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    description: 'A portrait of the Jazz Age in all its decadence and excess.',
    longDescription: 'The Great Gatsby, F. Scott Fitzgerald\'s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers as the great American novel.',
    categoryId: '7',
    rating: 4.4,
    reviewCount: 8765,
    isbn: '978-0743273565',
    publisher: 'Scribner',
    publishDate: '1925-04-10',
    pages: 180,
    language: 'English',
    inStock: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Absolutely beautiful and thought-provoking',
    content: 'This book made me cry, laugh, and think about my own life choices. Matt Haig has a way of making you see the world differently. Highly recommend to anyone going through a tough time.',
    date: '2024-01-15',
    helpful: 234,
  },
  {
    id: '2',
    productId: '1',
    userName: 'James K.',
    rating: 4,
    title: 'Great concept, well executed',
    content: 'The premise is fascinating and the execution is solid. Some parts felt a bit repetitive, but overall a wonderful read that stays with you.',
    date: '2024-01-10',
    helpful: 156,
  },
  {
    id: '3',
    productId: '1',
    userName: 'Emily R.',
    rating: 5,
    title: 'Life-changing perspective',
    content: 'I couldn\'t put it down. The way Haig explores regret and possibility is masterful. This book genuinely changed how I think about my own path.',
    date: '2024-01-05',
    helpful: 189,
  },
  {
    id: '4',
    productId: '2',
    userName: 'Michael T.',
    rating: 5,
    title: 'The best self-improvement book',
    content: 'Clear, actionable advice that actually works. I\'ve implemented several habits from this book and seen real changes in my life.',
    date: '2024-02-01',
    helpful: 567,
  },
  {
    id: '5',
    productId: '2',
    userName: 'Lisa P.',
    rating: 5,
    title: 'Finally, a practical approach',
    content: 'Unlike other self-help books that just motivate, this one gives you a system. The 1% better every day concept is powerful.',
    date: '2024-01-28',
    helpful: 432,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.categoryId === categoryId);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.id !== productId && p.categoryId === product.categoryId)
    .slice(0, limit);
};

export const getProductReviews = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.author.toLowerCase().includes(lowerQuery)
  );
};

export const getFeaturedProducts = (limit: number = 6): Product[] => {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);
};
