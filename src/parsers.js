import yaml from 'js-yaml';

// convert JSON-formatted and YAML-formatted strings into JS object:
const parseFileContent = (contentOfFile, extension) => {
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
