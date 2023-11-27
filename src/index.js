import fs from 'fs';
import path from 'path';
import parseFileContent from './parsers.js';
import buildDiffTree from './buildDiffTree.js';
import selectDiffFormatter from './formatters/index.js';

export const getAbsolutePathToFile = (filepath) => path.resolve(process.cwd(), filepath);

export const readAndGetContentOfFile = (filepath) => {
  const absolutePathToFile = getAbsolutePathToFile(filepath);
  return fs.readFileSync(absolutePathToFile, 'utf-8');
};

export const getExtension = (filepath) => path.extname(filepath).slice(1);

export const generateDiff = (
  filepath1,
  filepath2,
  formatterName = 'stylish',
) => {
  const contentOfFile1 = readAndGetContentOfFile(filepath1);
  const contentOfFile2 = readAndGetContentOfFile(filepath2);
  const extensionOfFile1 = getExtension(filepath1);
  const extensionOfFile2 = getExtension(filepath2);

  const parsedFile1 = parseFileContent(contentOfFile1, extensionOfFile1);
  const parsedFile2 = parseFileContent(contentOfFile2, extensionOfFile2);

  const diffTreeOfFiles = buildDiffTree(parsedFile1, parsedFile2);
  return selectDiffFormatter(diffTreeOfFiles, formatterName);
};
