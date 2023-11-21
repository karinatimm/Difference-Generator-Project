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
