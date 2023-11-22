import fs from 'fs';
import path from 'path';

export const displayHelp = (program) => {
  if (program.opts().help) {
    console.log(program.helpInformation());
  }
};

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

export const compareTwoJSONFiles = (
  filepath1,
  filepath2,
  replacer = ' ',
  spacesCount = 1,
) => {
  const parsedFile1 = parseJSONFileIntoJSObject(filepath1);
  const parsedFile2 = parseJSONFileIntoJSObject(filepath2);

  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const unitKeys = [...keys1, ...keys2];

  const sortedUniqueKeys = [...new Set(unitKeys)].sort();
  const space = replacer.repeat(spacesCount);
  const spaceForEqualCase = replacer.repeat(spacesCount * 4);
  const diff = sortedUniqueKeys.reduce((acc, key) => {
    // check if values accociated with the keys are equal
    if (parsedFile1[key] === parsedFile2[key]) {
      acc.push(`${spaceForEqualCase}${key}: ${parsedFile1[key]}`);
    } else if (
      parsedFile1[key] !== undefined
      && parsedFile2[key] === undefined
    ) {
      acc.push(`${space} - ${key}: ${parsedFile1[key]}`);
    } else if (
      parsedFile1[key] === undefined
      && parsedFile2[key] !== undefined
    ) {
      acc.push(`${space} + ${key}: ${parsedFile2[key]}`);
    } else {
      acc.push(`${space} - ${key}: ${parsedFile1[key]}`);
      acc.push(`${space} + ${key}: ${parsedFile2[key]}`);
    }
    return acc;
  }, []);
  return `{\n${diff.join('\n')}\n}`;
};
