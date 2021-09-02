import wordCounter from './src/wordCounter';
const filePath: string | undefined = process.argv[2];

wordCounter(filePath);