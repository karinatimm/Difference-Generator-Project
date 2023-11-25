import _ from "lodash";

const replacer = " ";
const indentationForClosingBraces = "  ";
const spacesCount = 4;
const shiftToTheLeft = 2;

// calculate the total number of spaces for indentation at a particular nesting level
const getIndent = (nestingLevel) =>
  replacer.repeat(nestingLevel * spacesCount - shiftToTheLeft);

// check if it the value of object is nested or not
const stringifyValueOfObject = (value, nestingLevel) => {
  // if it's not an object
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  //check children
  // array containing formatted strings for each key-value pair within the object
  const arrOfFormattedKeyValueString = Object.entries(value).map(
    ([keyOfValue, valOfValue]) => {
      // total indentation spaces based on the nesting level
      const totalNumOfIndentationSpaces = getIndent(nestingLevel + 1);
      // construct a formatted string for each key-value pair in the object
      return `${totalNumOfIndentationSpaces}  ${keyOfValue}: ${stringifyValueOfObject(
        valOfValue,
        nestingLevel + 1
      )}`;
    }
  );
  // construct the final formatted string (the entire object and its children)
  return `{\n${arrOfFormattedKeyValueString.join("\n")}\n${getIndent(
    nestingLevel
  )}${indentationForClosingBraces}}`;
};

const stylish = (diffTreeOfFiles, nestingLevel = 1) => {
  const arrOfFormattedPairStrings = diffTreeOfFiles.map(
    ({ key, type, value, valueInFile1, valueInFile2 }) => {
      switch (type) {
        case "nested":
          return `${getIndent(nestingLevel)}  ${key}: {\n${stylish(
            value,
            nestingLevel + 1
          ).join("\n")}\n${getIndent(
            nestingLevel
          )}${indentationForClosingBraces}}`;
        case "addMinusForFile1":
          return `${getIndent(nestingLevel)}- ${key}: ${stringifyValueOfObject(
            value,
            nestingLevel
          )}`;
        case "addPlusForFile2":
          return `${getIndent(nestingLevel)}+ ${key}: ${stringifyValueOfObject(
            value,
            nestingLevel
          )}`;
        case "addedBoth":
          return `${getIndent(nestingLevel)}- ${key}: ${stringifyValueOfObject(
            valueInFile1,
            nestingLevel
          )}\n${getIndent(nestingLevel)}+ ${key}: ${stringifyValueOfObject(
            valueInFile2,
            nestingLevel
          )}`;
        case "unchanged":
          return `${getIndent(nestingLevel)}  ${key}: ${stringifyValueOfObject(
            value,
            nestingLevel
          )}`;
        default:
          throw new Error(
            `Error: ${type} - this type doesn't exist in this file`
          );
      }
    }
  );
  //   console.log(arrOfFormattedPairStrings);
  const formattedDiffTree = `{\n${arrOfFormattedPairStrings.join("\n")}\n}`;
  return formattedDiffTree;
};

export default stylish;
