import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seeding...');
  
    // Create a placeholder User
    const placeholderUser = await prisma.user.create({
      data: {
        email: 'placeholder@example.com',
        name: 'Placeholder User',
      },
    });
    console.log(`Created placeholder User with ID: ${placeholderUser.id}`);
  
  
    // Create a placeholder Ebook, linked to the placeholder user
    const placeholderEbook = await prisma.ebook.create({
      data: {
        userId: placeholderUser.id, // Use the ID of the created user
        filename: 'placeholder-ebook.pdf',
        status: 'Published',
        extractedText: 'Placeholder content for basic trading concepts.',
      },
    });
    console.log(`Created placeholder Ebook with ID: ${placeholderEbook.id}`);
  
    const cards = [
      {
        title: 'What is Day Trading?',
        content: 'Day trading involves buying and selling financial instruments within the same trading day.',
        question: 'What is the primary goal of day trading?',
        options: ['To hold positions overnight', 'To make quick profits within a day', 'To invest long-term', 'To avoid trading'],
        correctAnswer: 1,
        category: 'Basics',
        difficulty: 'Easy',
      },
      {
        title: 'Understanding Market Orders',
        content: 'Market orders are executed immediately at the current market price.',
        question: 'What is a market order?',
        options: ['An order to buy at a specific price', 'An order executed immediately at the current price', 'An order to sell at a specific price', 'An order to hold a position'],
        correctAnswer: 1,
        category: 'Orders',
        difficulty: 'Easy',
      },
      {
        title: 'Risk Management',
        content: 'Risk management is crucial in trading to protect your capital.',
        question: 'What is a stop-loss order?',
        options: ['An order to buy more shares', 'An order to sell at a specific price to limit losses', 'An order to hold a position', 'An order to increase risk'],
        correctAnswer: 1,
        category: 'Risk',
        difficulty: 'Medium',
      },
      {
        title: 'Technical Analysis',
        content: 'Technical analysis involves studying price charts and patterns.',
        question: 'What is a moving average?',
        options: ['A fixed price', 'An average of prices over a specific period', 'A random number', 'A market order'],
        correctAnswer: 1,
        category: 'Analysis',
        difficulty: 'Medium',
      },
      {
        title: 'Fundamental Analysis',
        content: 'Fundamental analysis involves evaluating a company\'s financial health.',
        question: 'What is a P/E ratio?',
        options: ['A price-to-earnings ratio', 'A profit margin', 'A market cap', 'A dividend yield'],
        correctAnswer: 0,
        category: 'Analysis',
        difficulty: 'Hard',
      },
      {
        title: 'Trading Psychology',
        content: 'Trading psychology is about managing emotions and maintaining discipline.',
        question: 'What is FOMO in trading?',
        options: ['Fear of Missing Out', 'Fear of Market Orders', 'Fear of Moving On', 'Fear of Market Outcry'],
        correctAnswer: 0,
        category: 'Psychology',
        difficulty: 'Easy',
      },
      {
        title: 'Trading Strategies',
        content: 'Trading strategies are plans to achieve trading goals.',
        question: 'What is a scalping strategy?',
        options: ['A long-term investment strategy', 'A strategy to make quick, small profits', 'A strategy to hold positions overnight', 'A strategy to avoid trading'],
        correctAnswer: 1,
        category: 'Strategies',
        difficulty: 'Medium',
      },
      {
        title: 'Market Hours',
        content: 'Understanding market hours is essential for day trading.',
        question: 'When does the NYSE open?',
        options: ['9:30 AM EST', '10:00 AM EST', '8:00 AM EST', '9:00 AM EST'],
        correctAnswer: 0,
        category: 'Basics',
        difficulty: 'Easy',
      },
      {
        title: 'Trading Platforms',
        content: 'Trading platforms are software used to execute trades.',
        question: 'What is a trading platform?',
        options: ['A physical location for trading', 'Software used to execute trades', 'A market order', 'A trading strategy'],
        correctAnswer: 1,
        category: 'Platforms',
        difficulty: 'Easy',
      },
      {
        title: 'Trading Costs',
        content: 'Trading costs include commissions and fees.',
        question: 'What is a commission?',
        options: ['A fee paid to a broker for executing a trade', 'A profit from trading', 'A loss from trading', 'A market order'],
        correctAnswer: 0,
        category: 'Costs',
        difficulty: 'Easy',
      },
    ];
  
    console.log('Starting card seeding...');
    for (const card of cards) {
      await prisma.card.create({ data: { ...card, ebookId: placeholderEbook.id } });
    }
    console.log('Card seeding complete.');
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });