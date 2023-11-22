import fs from 'fs';
import path from 'path';

// convert filepath into an absolute path based on the current working directory:
export const getAbsolutePathToFile = (filepath) => {
  const pathToFile = path.resolve(process.cwd(), filepath);
  return pathToFile;
};
// read the content of the file at the end of this absolute path:
export const readTheContentOfJSONFile = (filepath) => {
  const absolutePathToFile = getAbsolutePathToFile(filepath);
  const content = fs.readFileSync(absolutePathToFile);
  return content;
};
// convert JSON-formatted string into JS object:
export const parseJSONFileIntoJSObject = (filepath) => {
  const contentOfJSONFile = readTheContentOfJSONFile(filepath);
  const parsedFile = JSON.parse(contentOfJSONFile);
  return parsedFile;
};

const generateJSONDiff = (parsedFile1, parsedFile2, replacer, spacesCount) => {
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const unitKeys = [...new Set([...keys1, ...keys2])].sort();

  const space = replacer.repeat(spacesCount);
  const spaceForEqualCase = replacer.repeat(spacesCount * 4);

  return unitKeys.reduce((acc, key) => {
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];

    if (value1 === value2) {
      acc.push(`${spaceForEqualCase}${key}: ${value1}`);
    } else if (value1 !== undefined && value2 === undefined) {
      acc.push(`${space} - ${key}: ${value1}`);
    } else if (value1 === undefined && value2 !== undefined) {
      acc.push(`${space} + ${key}: ${value2}`);
    } else {
      acc.push(`${space} - ${key}: ${value1}`);
      acc.push(`${space} + ${key}: ${value2}`);
    }
    return acc;
  }, []);
};

export const compareTwoJSONFiles = (
  filepath1,
  filepath2,
  replacer = ' ',
  spacesCount = 1,
) => {
  const parsedFile1 = parseJSONFileIntoJSObject(filepath1);
  const parsedFile2 = parseJSONFileIntoJSObject(filepath2);

  const diff = generateJSONDiff(
    parsedFile1,
    parsedFile2,
    replacer,
    spacesCount,
  );
  return `{\n${diff.join('\n')}\n}`;
};
