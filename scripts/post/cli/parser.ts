import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export interface SeedOptions {
  numberOfPosts: number;
}

export function parseSeedOptions(): SeedOptions {
  const argv = yargs(hideBin(process.argv))
    .option('number-of-posts', {
      alias: 'n',
      type: 'number',
      default: 10,
      description: 'The number of posts to be generated',
    })
    .check((argv) => {
      if (argv['number-of-posts'] <= 0) {
        throw new Error('Number of posts must be a positive integer.');
      }
      return true;
    })
    .parseSync();
  return {
    numberOfPosts: argv['number-of-posts'],
  };
}
