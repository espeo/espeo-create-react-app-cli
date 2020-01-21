const fs = require('fs');
const combineReducersContentMatch = /\({([^}]+)\}/;
const prettify = require("./prettify");
const filesManager = require('./filesManager');

const updateRootStore = name => {
  const camelCaseName = name.charAt(0).toLowerCase() + name.slice(1);
  const reducerName = name.charAt(0).toUpperCase() + name.slice(1);

  let rootStoreFile = filesManager.findFile('rootReducer.ts');
  if (!rootStoreFile) {
    console.log('Could not find rootReducer file!');
    return;
  }
  console.log('Updating rootReducer', rootStoreFile);

  let rootStore = fs.readFileSync(rootStoreFile, 'utf-8');
  rootStore = rootStore.replace(
    /\nconst rootReducer: Reducer =/,
    `import { ${reducerName}Reducer } from "@core/pages/${reducerName}/store/${camelCaseName}.reducer"; \n \nconst rootReducer: Reducer =`,
  );

  let matches = rootStore.match(combineReducersContentMatch)[1].trim();
  matches += `\n${camelCaseName}: ${reducerName}Reducer `;
  matches = matches.replace(/,,/g, ',');

  rootStore = prettify(
    rootStore.replace(combineReducersContentMatch, `({ ${matches} }`)
  );

  try {
    fs.writeFileSync(rootStoreFile, rootStore);
    console.log('Successfuly updated rootReducer file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = updateRootStore;
