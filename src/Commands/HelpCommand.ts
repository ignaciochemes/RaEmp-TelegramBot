import * as path from 'path';
import * as fs from 'fs';

export const HelpCommand = () => {
    let mdFile = path.resolve(__dirname, '../../../src/Md');
    let readFile = fs.readFileSync(mdFile + '/HelpResponse.md', "utf8");
    return readFile;
}