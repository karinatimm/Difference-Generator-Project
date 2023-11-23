#!/usr/bin/env node
import { program } from 'commander';
import { generateDiff } from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .option('-V, --version', 'output the version number')
  .action((filepath1, filepath2) => {
    const diff = generateDiff(filepath1, filepath2);
    console.log(diff);
  });

program.parse(process.argv);
