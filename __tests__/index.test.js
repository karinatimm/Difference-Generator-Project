import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { generateDiff } from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import parseFileContent from '../src/parsers.js';

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

describe('JSON and YAML Files Comparison', () => {
  const file1JSONPath = getFixturePath('file1.json');
  const file2JSONPath = getFixturePath('file2.json');
  const file1YMLPath = getFixturePath('file1.yml');
  const file2JYAMLPath = getFixturePath('file2.yaml');

  test('compareTwoJSONFiles', () => {
    const result = generateDiff(file1JSONPath, file2JSONPath);
    const expected = readContentOfFixture('stylish_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });

  test('compareTwoYAMLFiles', () => {
    const result = generateDiff(file1YMLPath, file2JYAMLPath);
    const expected = readContentOfFixture('stylish_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });
});

describe('Throwing Error in stylish and parsers functions', () => {
  test('unsupported type in keys in stylish function should throw an error', () => {
    const diffTreeOfFiles = [
      { key: 'key1', type: 'unsupported', value: 'value1' },
    ];

    expect(() => stylish(diffTreeOfFiles)).toThrow(
      'Error: "unsupported" - this type doesn\'t exist in this file',
    );
  });

  test('unsupported extension in parseFileContent function should throw an error', () => {
    const contentOfFile = '...';
    const extension = 'txt';

    expect(() => parseFileContent(contentOfFile, extension)).toThrow(
      'Error: "txt" - this is an invalid extension',
    );
  });
});
