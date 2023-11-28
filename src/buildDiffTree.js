import _ from 'lodash';

const genObjForAddBothType = (key, currVal1, currVal2) => ({
  key,
  value1: currVal1,
  value2: currVal2,
  type: 'addBoth',
});

const buildDiffTree = (parsedFile1, parsedFile2) => {
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const sortedUnionKeys = _.sortBy(_.union(keys1, keys2));

  return sortedUnionKeys.map((key) => {
    const currVal1 = parsedFile1[key];
    const currVal2 = parsedFile2[key];

    if (_.isPlainObject(currVal1) && _.isPlainObject(currVal2)) {
      return {
        key,
        value: buildDiffTree(currVal1, currVal2),
        type: 'nested',
      };
    }
    if (_.isEqual(currVal1, currVal2)) {
      return { key, value: currVal1, type: 'unchanged' };
    }
    if (_.isUndefined(currVal1)) {
      return { key, value: currVal2, type: 'addPlusForFile2' };
    }
    if (_.isUndefined(currVal2)) {
      return { key, value: currVal1, type: 'addMinusForFile1' };
    }
    return genObjForAddBothType(key, currVal1, currVal2);
  });
};

export default buildDiffTree;
