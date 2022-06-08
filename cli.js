import fs from "fs";
import path from "path";

const testStr = [
  "import test from 'test'",
  "import {test} from 'test'",
  "import { test } from 'test'",
  "import {test,test1} from 'test'",
  "import { test, test2 } from 'test'",
  "import{ test, test2 }from 'test'",
  "import{test,test2}from 'test'",
  "import testDouble2, { add as testAdd2 } from './module'",
];

// utils func for test
const utils = {
  forEachTest: (testArr, testFunc) => {
    testArr.forEach((item, idx) =>
      console.log(`testFunc ${idx}: `, testFunc(item))
    );
  },
  pipe:
    (...fns) =>
      (initialValue) =>
        fns.reduce((acc, fn) => fn(acc), initialValue),
  //TODO: should fixed
  curry: (func) => {
    let fnArgLength = func.length;
    // func is the function to transform
    return (...args) => {
      if (args.length >= fnArgLength) { // (1)
        return func.apply(this, args);
      }

      return func.bind(null, ...args); // (2)
    };
  },
};

const getImportMatchStatement = (syntax) => {
  const matches = syntax.match(/(?<prefix>import.*from)(?<file>.*)/);

  return {
    prefix: matches.groups.prefix,
    file: matches.groups.file.replaceAll(/'/g, ""),
  };
};

const appendFileExtensions = (prefix, fileName, extension) => {
  return `${prefix} '${fileName}.${extension}'`;
};

// utils.forEachTest(testStr, (item) => {
//   const { prefix, file } = getImportMatchStatement(item);
//   return utils.curry(appendFileExtensions)(prefix, file)('js');
// });
// utils.forEachTest(testStr, (item) => {
//   return item[item.length - item.lastIndexOf('from')]
// });

// fs.readFile("./test.js", "utf8", (err, data) => {
//   if (err) {
//     console.error("🚀 ~ file: cli.js ~ line 39 ~ fs.readFileSync ~ err", err);
//     return;
//   }

//   console.log("🚀 ~ data:\n", JSON.parse(JSON.stringify(data)));
// });
// const concatPaths = (data) => {
//   let pathsIdx = data.search(/paths/) - 1
//   let pathStr = ''
//   let isBreak = false
//   do {
//     const str = data[pathsIdx];
//     pathStr += str
//     pathsIdx++

//     if (str === '}') break
//   } while (true);

//   return pathStr
// }
fs.readFile('./tsconfig.json', 'utf8', (err, data) => {
  if (err) {
    console.error("🚀 ~ fs.readFile ~ error:", err)
    return;
  }

  try {
    console.log("🚀 ~ data from JSON: ", JSON.parse(data))
  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
})

// readline
//   .createInterface({ input: fs.createReadStream('./tsconfig.json') })
//   .on('line', function (line) {
//     console.log('NEW LINE: ', line);
//   });