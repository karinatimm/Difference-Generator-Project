import fs from "fs";
import path from "path";
import _ from "lodash";
import parseFileContent from "./parsers.js";

// convert filepath into an absolute path based on the current working directory:
export const getAbsolutePathToFile = (filepath) =>
  path.resolve(process.cwd(), filepath);

// read the content of the file at the end of this absolute path:
export const readAndGetContentOfFile = (filepath) => {
  const absolutePathToFile = getAbsolutePathToFile(filepath);
  return fs.readFileSync(absolutePathToFile, "utf-8");
};

// path.extname method returns the extension (including the dot)
export const getExtension = (filepath) => path.extname(filepath).slice(1);

// get indent
const getIndent = (nestingLevel, replacer = " ", spacesCount = 4) =>
  replacer.repeat(nestingLevel * spacesCount).slice(0, -2);

// check if it the value of object is nested or not
const stringifyValueOfObject = (value, nestingLevel, doubleReplacer = "  ") => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const result = Object.entries(value).map(
    ([keyOfValue, valOfValue]) =>
      `${getIndent(nestingLevel + 1)}  ${keyOfValue}: ${stringify(
        valOfValue,
        nestingLevel + 1
      )}`
  );
  return `{\n${result.join("\n")}\n${getIndent(
    nestingLevel
  )}${doubleReplacer}}`;
};

// check nested values of keys without indentation
export const genDiff = (filepath1, filepath2) => {
  const content1 = readAndGetContentOfFile(filepath1);
  const content2 = readAndGetContentOfFile(filepath2);

  const parsedFile1 = parseFileContent(content1, getExtension(filepath1));
  const parsedFile2 = parseFileContent(content2, getExtension(filepath2));

  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const unitKeys = [...keys1, ...keys2];
  const sortedUniqueKeys = [...new Set(unitKeys)].sort();

  const diff = sortedUniqueKeys.reduce((acc, key) => {
    const currentValue1 = parsedFile1[key];
    const currentValue2 = parsedFile2[key];
    if (_.isPlainObject(currentValue1) && _.isPlainObject(currentValue2)) {
      acc.push(`${key}: ${genDiff(currentValue1, currentValue2)}`);
    } else if (currentValue1 === currentValue2) {
      acc.push(`${key}: ${currentValue1}`);
    } else if (currentValue1 !== undefined && currentValue2 === undefined) {
      acc.push(`- ${key}: ${currentValue1}`);
    } else if (currentValue1 === undefined && currentValue2 !== undefined) {
      acc.push(`+ ${key}: ${currentValue2}`);
    } else {
      acc.push(`${key}: ${currentValue1}`);
      acc.push(`${key}: ${currentValue2}`);
    }
    return acc;
  }, []);
  return `{\n${diff.join("\n")}\n}`;
};

// export const compareFiles = (filepath1, filepath2, replacer, spacesCount) => {
//   const content1 = readAndGetContentOfFile(filepath1);
//   const content2 = readAndGetContentOfFile(filepath2);

//   const parsedFile1 = parseFileContent(content1, getExtension(filepath1));
//   const parsedFile2 = parseFileContent(content2, getExtension(filepath2));

//   const keys1 = Object.keys(parsedFile1);
//   const keys2 = Object.keys(parsedFile2);
//   const unitKeys = [...new Set([...keys1, ...keys2])].sort();

//   const space = replacer.repeat(spacesCount);
//   const spaceForEqualCase = replacer.repeat(spacesCount * 4);

//   return unitKeys.reduce((acc, key) => {
//     const value1 = parsedFile1[key];
//     const value2 = parsedFile2[key];

//     if (value1 === value2) {
//       acc.push(`${spaceForEqualCase}${key}: ${value1}`);
//     } else if (value1 !== undefined && value2 === undefined) {
//       acc.push(`${space} - ${key}: ${value1}`);
//     } else if (value1 === undefined && value2 !== undefined) {
//       acc.push(`${space} + ${key}: ${value2}`);
//     } else {
//       acc.push(`${space} - ${key}: ${value1}`);
//       acc.push(`${space} + ${key}: ${value2}`);
//     }
//     return acc;
//   }, []);
// };

// export const generateDiff = (
//   filepath1,
//   filepath2,
//   replacer = ' ',
//   spacesCount = 1,
// ) => {
//   const diff = compareFiles(filepath1, filepath2, replacer, spacesCount);
//   return `{\n${diff.join('\n')}\n}`;
// };
