import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';
import parseFileContent from '../src/parsers.js';
import makeDiffInStylishFormat from '../src/formatters/stylish.js';
import makeDiffInPlainFormat from '../src/formatters/plain.js';
import selectDiffFormatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readContentOfFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('JSON and YAML files comparison using stylish, plain, json formatters', () => {
  const testDataOfFiles = [
    ['file1.json', 'file2.json', 'stylish_result_of_diff.txt'],
    ['file1.yml', 'file2.yaml', 'stylish_result_of_diff.txt'],
    ['file1.json', 'file2.yaml', 'stylish_result_of_diff.txt'],
    ['file1.json', 'file2.yaml', 'stylish_result_of_diff.txt', 'stylish'],
    ['file1.json', 'file2.yaml', 'plain_result_of_diff.txt', 'plain'],
    ['file1.json', 'file2.yaml', 'json_result_of_diff.txt', 'json'],
  ];

  test.each(testDataOfFiles)(
    'compare files using formatter',
    (file1, file2, expectedFile, format = 'stylish') => {
      const file1Path = getFixturePath(file1);
      const file2Path = getFixturePath(file2);
      const result = generateDiff(file1Path, file2Path, format);
      const expected = readContentOfFixture(expectedFile).trim();
      expect(result.trim()).toEqual(expected);
    },
  );
});

describe('Throwing errors in utility functions', () => {
  const testDataOfErrors = [
    [
      'unsupported extension in parseFileContent function',
      ['...', 'txt'],
      parseFileContent,
      'Error: "txt" - this is an invalid extension',
    ],
    [
      'unsupported type in keys in makeDiffInStylishFormat function',
      [[{ key: 'key1', type: 'unsupported', value: 'value1' }]],
      makeDiffInStylishFormat,
      'Error: "unsupported" - this is an invalid type',
    ],
    [
      'unsupported type in keys in makeDiffInPlainFormat function',
      [[{ key: 'key1', type: 'unsupported', value: 'value1' }]],
      makeDiffInPlainFormat,
      'Error: "unsupported" - this is an invalid type',
    ],
    [
      'incorrect formatter name in selectDiffFormatter function',
      [[{ key: 'key1', type: 'unchanged', value: 'value1' }], 'ftylish'],
      selectDiffFormatter,
      'Error: "ftylish" - this is an invalid name of formatter',
    ],
  ];

  test.each(testDataOfErrors)(
    '%s should throw an error',
    (description, inputData, func, errorMessage) => {
      expect(() => func(...inputData)).toThrow(errorMessage);
    },
  );
});
