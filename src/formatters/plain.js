import _ from 'lodash';

const convertValueToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : String(value);
};

const makeDiffInPlainFormat = (diffTreeOfFiles, pathOfKeys = '') => {
  const formattedDiffOfTree = diffTreeOfFiles
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      // base case
      const currentPath = pathOfKeys === '' ? node.key : `${pathOfKeys}.${node.key}`;

      switch (node.type) {
        case 'nested':
          return makeDiffInPlainFormat(node.value, currentPath);
        case 'addMinusForFile1':
          return `Property '${currentPath}' was removed`;
        case 'addPlusForFile2':
          return `Property '${currentPath}' was added with value: ${convertValueToString(
            node.value,
          )}`;
        case 'addBoth':
          return `Property '${currentPath}' was updated. From ${convertValueToString(
            node.valueInFile1,
          )} to ${convertValueToString(node.valueInFile2)}`;
        default:
          throw new Error(`Error: "${node.type}" - this is an invalid type`);
      }
    });

  return formattedDiffOfTree.join('\n');
};

export default makeDiffInPlainFormat;
