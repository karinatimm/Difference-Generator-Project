import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { generateDiff } from '../src/index.js';
import parseFileContent from '../src/parsers.js';
import makeDiffInStylishFormat from '../src/formatters/stylish.js';
import makeDiffInPlainFormat from '../src/formatters/plain.js';
import selectDiffFormatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readContentOfFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('JSON and YAML files comparison using stylish, plain formatters', () => {
  const file1JSONPath = getFixturePath('file1.json');
  const file2JSONPath = getFixturePath('file2.json');
  const file1YMLPath = getFixturePath('file1.yml');
  const file2JYAMLPath = getFixturePath('file2.yaml');

  test('compare two JSON-formatted files using default(stylish) formatter', () => {
    const result = generateDiff(file1JSONPath, file2JSONPath);
    const expected = readContentOfFixture('stylish_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });

  test('compare two YAML-formatted files using default(stylish) formatter', () => {
    const result = generateDiff(file1YMLPath, file2JYAMLPath);
    const expected = readContentOfFixture('stylish_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });

  test('compare two JSON/YAML-formatted files using default(stylish) formatter', () => {
    const result = generateDiff(file1JSONPath, file2JYAMLPath);
    const expected = readContentOfFixture('stylish_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });

  test('compare two JSON/YAML-formatted files using stylish formatter', () => {
    const result = generateDiff(file1JSONPath, file2JYAMLPath, 'stylish');
    const expected = readContentOfFixture('stylish_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });

  test('compare two JSON/YAML-formatted files using plain formatter', () => {
    const result = generateDiff(file1JSONPath, file2JYAMLPath, 'plain');
    const expected = readContentOfFixture('plain_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });

  test('compare two JSON/YAML-formatted files using json formatter', () => {
    const result = generateDiff(file1JSONPath, file2JYAMLPath, 'json');
    const expected = readContentOfFixture('json_result_of_diff.txt').trim();
    expect(result.trim()).toEqual(expected);
  });
});

describe('Throwing Error in parseFileContent, makeDiffInStylishFormat, makeDiffInPlainFormat functions', () => {
  test('unsupported extension in parseFileContent function should throw an error', () => {
    const contentOfFile = '...';
    const extension = 'txt';

    expect(() => parseFileContent(contentOfFile, extension)).toThrow(
      'Error: "txt" - this is an invalid extension',
    );
  });

  test('unsupported type in keys in makeDiffInStylishFormat function should throw an error', () => {
    const diffTreeOfFiles = [
      { key: 'key1', type: 'unsupported', value: 'value1' },
    ];

    expect(() => makeDiffInStylishFormat(diffTreeOfFiles)).toThrow(
      'Error: "unsupported" - this is an invalid type',
    );
  });

  test('unsupported type in keys in makeDiffInPlainFormat function should throw an error', () => {
    const diffTreeOfFiles = [
      { key: 'key1', type: 'unsupported', value: 'value1' },
    ];

    expect(() => makeDiffInPlainFormat(diffTreeOfFiles)).toThrow(
      'Error: "unsupported" - this is an invalid type',
    );
  });

  test('incorrected formatter name in selectDiffFormatter function should throw an error', () => {
    const diffTreeOfFiles = [
      { key: 'key1', type: 'unchanged', value: 'value1' },
    ];
    const formatterName = 'ftylish';

    expect(() => selectDiffFormatter(diffTreeOfFiles, formatterName)).toThrow(
      'Error: "ftylish" - this is an invalid name of formatter',
    );
  });
});
