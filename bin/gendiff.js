#!/usr/bin/env node
import { program } from 'commander';
import { displayHelp, parseJSONFileIntoJSObject } from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const displayParsedFiles = () => {
      const file1 = parseJSONFileIntoJSObject(filepath1);
      const file2 = parseJSONFileIntoJSObject(filepath2);
      console.log(file1, file2);
    };

    displayParsedFiles();
  })
  .parse(process.argv);
// put program in order to have access to the options of the Commander program:
displayHelp(program);
