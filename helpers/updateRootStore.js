const fs = require("fs");
const combineReducersContentMatch = /\({([^}]+)\}/;
const findUp = require("find-up");

const updateRootStore = async name => {
  const rootStoreFile = await findUp("root-store.ts");
  const lowerCaseName = name.toLowerCase();

  let rootStore = fs.readFileSync(rootStoreFile, "utf-8");

  rootStore = rootStore.replace(
    /const rootReducer =/,
    `\nimport {${lowerCaseName}Reducer} from "@core/store/${lowerCaseName}"; \n \nconst rootReducer =`
  );

  let matches = rootStore.match(combineReducersContentMatch)[1].trim();

  matches += `,\n${lowerCaseName}: ${lowerCaseName}Reducer `;

  matches = matches.replace(/,,/g, ",");
  rootStore = rootStore.replace(combineReducersContentMatch, `({ ${matches} }`);

  try {
    fs.writeFileSync(rootStoreFile, rootStore);
  } catch (err) {
    throw err;
  }
};

module.exports = updateRootStore;
