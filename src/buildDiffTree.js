import _ from 'lodash';

const buildDiffTree = (parsedFile1, parsedFile2) => {
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const allKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(allKeys);

  const diff = sortedKeys.reduce((acc, key) => {
    const currentValue1 = parsedFile1[key];
    const currentValue2 = parsedFile2[key];

    // nested
    if (_.isPlainObject(currentValue1) && _.isPlainObject(currentValue2)) {
      acc.push({
        key,
        value: buildDiffTree(currentValue1, currentValue2),
        type: 'nested',
      });
    } else if (_.isEqual(currentValue1, currentValue2)) {
      acc.push({ key, value: currentValue1, type: 'unchanged' });
    } else if (_.isUndefined(currentValue1)) {
      acc.push({ key, value: currentValue2, type: 'addPlusForFile2' });
    } else if (_.isUndefined(currentValue2)) {
      acc.push({ key, value: currentValue1, type: 'addMinusForFile1' });
    } else {
      acc.push({
        key,
        valueInFile1: currentValue1,
        valueInFile2: currentValue2,
        type: 'addBoth',
      });
    }

    return acc;
  }, []);

  return diff;
};

export default buildDiffTree;
