import _ from 'lodash';

const getIndentNested = (nestingLevel) => {
  const replacer = ' ';
  const spacesCount = 4;
  const shiftToTheLeft = 2;
  const indent = replacer.repeat(nestingLevel * spacesCount - shiftToTheLeft);
  return indent;
};

const getIndentSimple = (nestingLevel) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indent = replacer.repeat(nestingLevel * spacesCount);
  return indent;
};

// check if it the value of object is nested or not
const stringify = (value, nestingLevel) => {
  // if it's not an object
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  // check children
  // array containing formatted strings for each key-value pair within the object
  const arrOfFormattedKeyValStrings = Object.entries(value).map(
    ([keyOfValue, valOfValue]) => `${getIndentSimple(nestingLevel + 1)}${keyOfValue}: ${stringify(
      valOfValue,
      nestingLevel + 1,
    )}\n`,
  );

  return `{\n${arrOfFormattedKeyValStrings.join('')}${getIndentSimple(
    nestingLevel,
  )}}`;
};

const makeDiffInStylishFormat = (diffTreeOfFiles, nestingLevel = 1) => {
  const formattedDiffOfTree = diffTreeOfFiles.map(
    ({
      key, type, value, valueInFile1, valueInFile2,
    }) => {
      switch (type) {
        case 'nested':
          return `${getIndentNested(
            nestingLevel,
          )}  ${key}: ${makeDiffInStylishFormat(value, nestingLevel + 1)}`;
        case 'addMinusForFile1':
          return `${getIndentNested(nestingLevel)}- ${key}: ${stringify(
            value,
            nestingLevel,
          )}`;
        case 'addPlusForFile2':
          return `${getIndentNested(nestingLevel)}+ ${key}: ${stringify(
            value,
            nestingLevel,
          )}`;
        case 'addBoth':
          return `${getIndentNested(nestingLevel)}- ${key}: ${stringify(
            valueInFile1,
            nestingLevel,
          )}\n${getIndentNested(nestingLevel)}+ ${key}: ${stringify(
            valueInFile2,
            nestingLevel,
          )}`;
        case 'unchanged':
          return `${getIndentNested(nestingLevel)}  ${key}: ${stringify(
            value,
            nestingLevel,
          )}`;
        default:
          throw new Error(`Error: "${type}" - this is an invalid type`);
      }
    },
  );
  return `{\n${formattedDiffOfTree.join('\n')}\n${getIndentSimple(
    nestingLevel - 1,
  )}}`;
};

export default makeDiffInStylishFormat;
