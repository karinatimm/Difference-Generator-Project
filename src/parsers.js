import yaml from 'js-yaml';
import { readAndGetContentOfFile, getExtension } from './index.js';

// convert JSON-formatted and YAML-formatted strings into JS object:
const parseFileContent = (filepath) => {
  const extension = getExtension(filepath);
  const contentOfFile = readAndGetContentOfFile(filepath);

  switch (extension) {
    case 'json':
      return JSON.parse(contentOfFile);
    case 'yml':
    case 'yaml':
      return yaml.load(contentOfFile);
    default:
      throw new Error(`Invalid extension: ${extension}`);
  }
};

export default parseFileContent;
