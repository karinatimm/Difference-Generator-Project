import _ from "lodash";
// const file1 = {
//   common: {
//     setting1: "Value 1",
//     setting2: 200,
//     setting3: true,
//     setting6: {
//       key: "value",
//       doge: {
//         wow: "",
//       },
//     },
//   },
//   group1: {
//     baz: "bas",
//     foo: "bar",
//     nest: {
//       key: "value",
//     },
//   },
//   group2: {
//     abc: 12345,
//     deep: {
//       id: 45,
//     },
//   },
// };

// const file2 = {
//   common: {
//     follow: false,
//     setting1: "Value 1",
//     setting3: null,
//     setting4: "blah blah",
//     setting5: {
//       key5: "value5",
//     },
//     setting6: {
//       key: "value",
//       ops: "vops",
//       doge: {
//         wow: "so much",
//       },
//     },
//   },
//   group1: {
//     foo: "bar",
//     baz: "bars",
//     nest: "str",
//   },
//   group3: {
//     deep: {
//       id: {
//         number: 45,
//       },
//     },
//     fee: 100500,
//   },
// };

const buildDiffTree = (parsedFile1, parsedFile2) => {
  const keys1 = Object.keys(parsedFile1);
  const keys2 = Object.keys(parsedFile2);
  const unitKeys = [...keys1, ...keys2];
  const sortedUnitKeys = [...new Set(unitKeys)].sort();

  const diff = sortedUnitKeys.reduce((acc, key) => {
    const currentValue1 = parsedFile1[key];
    const currentValue2 = parsedFile2[key];

    // nested
    if (_.isPlainObject(currentValue1) && _.isPlainObject(currentValue2)) {
      acc.push({
        key,
        value: buildDiffTree(currentValue1, currentValue2),
        type: "nested",
      });
    } else if (currentValue1 === currentValue2) {
      acc.push({ key, value: currentValue1, type: "unchanged" });
    } else if (!Object.hasOwn(parsedFile2, key)) {
      acc.push({ key, value: currentValue1, type: "addMinusForFile1" });
    } else if (!Object.hasOwn(parsedFile1, key)) {
      acc.push({ key, value: currentValue2, type: "addPlusForFile2" });
    } else {
      acc.push({
        key,
        value1: currentValue1,
        value2: currentValue2,
        type: "addedBoth",
      });
    }

    return acc;
  }, []);
  //   console.log(JSON.stringify(diff, null, 2));
  return diff;
};

export default buildDiffTree;

// buildDiffTree(file1, file2);
// console.log(buildDiffTree(file1, file2));

// const buildDiffTree = (parsedFile1, parsedFile2) => {
//     const keys1 = Object.keys(parsedFile1);
//     const keys2 = Object.keys(parsedFile2);
//     const unitKeys = [...keys1, ...keys2];
//     const sortedUnitKeys = [...new Set(unitKeys)].sort();

//     const diff = sortedUnitKeys.map((key) => {
//       const currentValue1 = parsedFile1[key];
//       const currentValue2 = parsedFile2[key];

//       // nested
//       if (_.isPlainObject(currentValue1) && _.isPlainObject(currentValue2)) {
//         return { key, value: buildTree(currentValue1, currentValue2) };
//         // equal
//       } else if (currentValue1 === currentValue2) {
//         return { key, value: currentValue1 };
//         // in file1 exists key value
//       } else if (!Object.hasOwn(parsedFile1, key)) {
//         return { key, value: currentValue1 };
//         // in file2 exists key value
//       } else if (!Object.hasOwn(parsedFile2, key)) {
//         return { key, value: currentValue2 };
//         // no one has
//       } else if (currentValue1 !== currentValue2) {
//         return { key, value1: currentValue1, value2: currentValue2 };
//       }
//       return { key, value: currentValue1 };
//     });

//     return diff;
//   };

//   export default buildDiffTree;
