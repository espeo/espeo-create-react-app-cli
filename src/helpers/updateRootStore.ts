import fs from 'fs';
import findUp from 'find-up';

const combineReducersContentMatch = /\({([^}]+)\}/;

export const updateRootStore = async (name: string): Promise<void> => {
  const rootStoreFile = await findUp('store/rootReducer.ts');
  if (!rootStoreFile) {
    console.error('Could not find rootReducer file!');
    return;
  }
  const lowerCaseName = name.toLowerCase();
  const reducerName = name.charAt(0).toUpperCase() + name.slice(1);
  let rootStore = fs.readFileSync(rootStoreFile, 'utf-8');

  rootStore = rootStore.replace(
    /const rootReducer: Reducer =/,
    `\nimport { ${reducerName}Reducer } from "@core/pages/${lowerCaseName}/store/${lowerCaseName}.reducer"; \n \nconst rootReducer: Reducer =`,
  );

  let matches = rootStore.match(combineReducersContentMatch)[1].trim();

  matches += `,\n${lowerCaseName}: ${reducerName}Reducer `;

  matches = matches.replace(/,,/g, ',');
  rootStore = rootStore.replace(combineReducersContentMatch, `({ ${matches} }`);

  try {
    fs.writeFileSync(rootStoreFile, rootStore);
  } catch (err) {
    throw err;
  }
};
