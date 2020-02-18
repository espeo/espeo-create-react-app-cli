import { compose } from 'helpers';

const addImportStatement = (reducerName: string) => (
  rootReducer: string,
): string => {
  const upperCaseName =
    reducerName.charAt(0).toUpperCase() + reducerName.slice(1);

  return rootReducer.replace(
    /\nconst rootReducer: Reducer =/,
    `import { ${upperCaseName}Reducer } from '@core/pages/${upperCaseName}/store/reducers/${reducerName}.reducer';\n\nconst rootReducer: Reducer =`,
  );
};

const addReducerToCombinedReducersArray = (reducerName: string) => (
  rootReducer: string,
): string => {
  const combineReducersContentMatch = /\({([^}]+)\}/;
  const upperCaseName =
    reducerName.charAt(0).toUpperCase() + reducerName.slice(1);

  const matches = (
    (rootReducer.match(
      combineReducersContentMatch,
    ) as RegExpMatchArray)[1].trim() +
    `,\n${reducerName}: ${upperCaseName}Reducer`
  ).replace(/,,/g, ',');

  return rootReducer.replace(combineReducersContentMatch, `({ ${matches} }`);
};

export const addReducerToStore = (
  name: string,
  rootStoreContent: string,
): string => {
  const lowerCaseName = name.toLowerCase();
  const updatedContent = compose(
    addImportStatement(lowerCaseName),
    addReducerToCombinedReducersArray(lowerCaseName),
  )(rootStoreContent);

  return updatedContent;
};
