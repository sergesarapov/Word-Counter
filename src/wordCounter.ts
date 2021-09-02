const fs = require('fs');
const path = require('path');

type Path = string;
type TextContent = string;
type WordsList = RegExpMatchArray | null;

function wordCounter(filePath: Path): void {
    const errors = {
        missingPath: 'Error: The path argument is missing.\nPlease run the code: npm run counter <file path>.',
        noFile: 'Error: There is no file by the provided path.\nPlease make sure to provide the file name with the extension.',
        noWords: 'Error: The provided file does not contain any words.',
    };

    if (!filePath) {
        console.error(errors.missingPath);
        return;
    }

    const normalizedPath: Path = path.normalize(filePath);

    if (!fs.existsSync(normalizedPath) || fs.lstatSync(normalizedPath).isDirectory()) {
        console.error(errors.noFile);
        return;
    }

    const content: TextContent = fs.readFileSync(normalizedPath, 'utf-8');
    const wordsList: WordsList = content.match(/[a-zäöüßõ']+/gi);
    if (!wordsList) {
        console.error(errors.noWords);
        return;
    }

    const sortedList: string[] = wordsList.sort((a: string, b: string) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    const countedList: [string, number][] = [];

    sortedList.forEach(word => {
        const index = countedList.findIndex(arr => arr[0].toLowerCase() === word.toLowerCase());
        index < 0 ? countedList.push([word, 1]) : countedList[index][1]++;
    });
    countedList.map(arr => console.log(`${arr[0]}: ${arr[1]}`));
}

export default wordCounter;