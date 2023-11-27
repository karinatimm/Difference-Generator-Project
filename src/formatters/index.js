import makeDiffInStylishFormat from './stylish.js';
import makeDiffInPlainFormat from './plain.js';
import makeDiffInJSONFormat from './json.js';

const selectDiffFormatter = (diffTreeOfFiles, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return makeDiffInStylishFormat(diffTreeOfFiles);
    case 'plain':
      return makeDiffInPlainFormat(diffTreeOfFiles);
    case 'json':
      return makeDiffInJSONFormat(diffTreeOfFiles);
    default:
      throw new Error(
        `Error: "${formatterName}" - this is an invalid name of formatter`,
      );
  }
};

export default selectDiffFormatter;
