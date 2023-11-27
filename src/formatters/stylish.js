import _ from 'lodash';

const getSymbolIndent = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const shiftToTheLeft = 2;
  const indent = replacer.repeat(depth * spacesCount - shiftToTheLeft);
  return indent;
};

const getRegularIndent = (depth) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indent = replacer.repeat(depth * spacesCount);
  return indent;
};

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const arrOfFormattedKeyValStrings = Object.entries(value).map(
    ([key, val]) => `${getRegularIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}\n`,
  );

  return `{\n${arrOfFormattedKeyValStrings.join('')}${getRegularIndent(
    depth,
  )}}`;
};

const formatAddBothType = (depth, key, value1, value2) => `${getSymbolIndent(depth)}- ${key}: ${stringify(
  value1,
  depth,
)}\n${getSymbolIndent(depth)}+ ${key}: ${stringify(value2, depth)}`;

const makeDiffInStylishFormat = (diffTreeOfFiles, depth = 1) => {
  const arrOfFormattedStrings = diffTreeOfFiles.map(
    ({
      key, type, value, value1, value2,
    }) => {
      switch (type) {
        case 'nested':
          return `${getSymbolIndent(depth)}  ${key}: ${makeDiffInStylishFormat(
            value,
            depth + 1,
          )}`;
        case 'addMinusForFile1':
          return `${getSymbolIndent(depth)}- ${key}: ${stringify(
            value,
            depth,
          )}`;
        case 'addPlusForFile2':
          return `${getSymbolIndent(depth)}+ ${key}: ${stringify(
            value,
            depth,
          )}`;
        case 'addBoth':
          return formatAddBothType(depth, key, value1, value2);
        case 'unchanged':
          return `${getSymbolIndent(depth)}  ${key}: ${stringify(
            value,
            depth,
          )}`;
        default:
          throw new Error(`Error: "${type}" - this is an invalid type`);
      }
    },
  );
  return `{\n${arrOfFormattedStrings.join('\n')}\n${getRegularIndent(
    depth - 1,
  )}}`;
};

export default makeDiffInStylishFormat;
