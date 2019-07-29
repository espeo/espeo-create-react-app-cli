const fs = require("fs");
const combineReducersContentMatch = /\({([^}]+)\}/;

const updateRootStore = name => {
  let rootStore = fs.readFileSync(
    process.cwd() + "/src/app/root-store.ts",
    "utf-8"
  );

  const lowerCaseName = name.toLowerCase();

  rootStore = rootStore.replace(
    /const rootReducer =/,
    `\nimport {${lowerCaseName}Reducer} from "@core/store/${lowerCaseName}"; \n \nconst rootReducer =`
  );

  let matches = rootStore.match(combineReducersContentMatch)[1].trim();

  matches += `,\n${lowerCaseName}: ${lowerCaseName}Reducer `;

  rootStore = rootStore.replace(combineReducersContentMatch, `({ ${matches} }`);

  try {
    fs.writeFileSync(process.cwd() + "/src/app/root-store.ts", rootStore);
  } catch (err) {
    throw err;
  }
};

module.exports = updateRootStore;
