#!/usr/bin/env node
import { program } from 'commander';
import { displayHelp, compareTwoJSONFiles } from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = compareTwoJSONFiles(filepath1, filepath2);
    console.log(diff);
  });

program.parse(process.argv);

displayHelp(program);
