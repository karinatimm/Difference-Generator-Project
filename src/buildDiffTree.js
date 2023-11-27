import _ from 'lodash';

const buildDiffTree = (parsedFile1, parsedFile2) => {
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const allUnionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(allUnionKeys);

  const arrOfDiffTree = sortedUnionKeys.map((key) => {
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

    return {
      key,
      value1: currVal1,
      value2: currVal2,
      type: 'addBoth',
    };
  });

  return arrOfDiffTree;
};

// console.log(buildDiffTree(file1, file2));
export default buildDiffTree;

// nested
//     if (_.isPlainObject(currVal1) && _.isPlainObject(currVal2)) {
//       acc.push({
//         key,
//         value: buildDiffTree(currVal1, currVal2),
//         type: "nested",
//       });
//     } else if (_.isEqual(currVal1, currVal2)) {
//       acc.push({ key, value: currVal1, type: "unchanged" });
//     } else if (_.isUndefined(currVal1)) {
//       acc.push({ key, value: currVal2, type: "addPlusForFile2" });
//     } else if (_.isUndefined(currVal2)) {
//       acc.push({ key, value: currVal1, type: "addMinusForFile1" });
//     } else {
//       acc.push({
//         key,
//         value1: currVal1,
//         value2: currVal2,
//         type: "addBoth",
//       });
//     }

//     return acc;
//   }, []);

//   return diff;
