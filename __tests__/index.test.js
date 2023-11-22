import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { compareTwoJSONFiles } from '../src/index.js';

// convert this file URL to a file path compatible with Node.js functions
// __filename is the absolute path to the current file:
const __filename = fileURLToPath(import.meta.url);
// __dirname is the directory name from the absolute file path stored in __filename
// representing the directory in which the current file resides (directory of index.test.js)
const __dirname = dirname(__filename);

// абсолютные пути, созданные с помощью, getFixturePath будут указывать на файлы
// в __fixtures__ директории относительно местоположения index.test.js.
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readContentOfFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('JSON Files Comparison', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  test('compareTwoJSONFiles', () => {
    const result = compareTwoJSONFiles(file1Path, file2Path);
    const expected = readContentOfFixture('result_of_compare.txt').trim();
    expect(result.trim()).toEqual(expected);
  });
});
