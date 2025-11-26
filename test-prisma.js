const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    console.log('Available Prisma models:', Object.keys(prisma));
    
    // Try to fetch a simple product
    const products = await prisma.product.findMany({
      take: 1,
      include: {
        category: true
      }
    });
    
    console.log('Sample product structure:', JSON.stringify(products[0], null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
