import fs from "fs";
import path from "path";
import { parseFileContent } from "./parsers.js";

// convert filepath into an absolute path based on the current working directory:
export const getAbsolutePathToFile = (filepath) =>
  path.resolve(process.cwd(), filepath);

// read the content of the file at the end of this absolute path:
export const readAndGetContentOfFile = (filepath) => {
  const absolutePathToFile = getAbsolutePathToFile(filepath);
  return fs.readFileSync(absolutePathToFile);
};

// path.extname method returns the extension (including the dot)
export const getExtension = (filepath) => path.extname(filepath).slice(1);

export const compareFiles = (filepath1, filepath2, replacer, spacesCount) => {
  const content1 = readAndGetContentOfFile(filepath1);
  const content2 = readAndGetContentOfFile(filepath2);

  const parsedFile1 = parseFileContent(content1);
  const parsedFile2 = parseFileContent(content2);

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

export const generateDiff = (
  filepath1,
  filepath2,
  replacer = " ",
  spacesCount = 1
) => {
  const diff = compareFiles(filepath1, filepath2, replacer, spacesCount);
  return `{\n${diff.join("\n")}\n}`;
};
