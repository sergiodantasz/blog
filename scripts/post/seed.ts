import { parseSeedOptions } from './cli/parser';
import { seedPosts } from './services/seed-service';

async function main() {
  try {
    const options = parseSeedOptions();
    await seedPosts(options.numberOfPosts);
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Seeding failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
