type MockedFile = {
  path: string;
  content: string;
};

const mockedFiles: MockedFile[] = [
  { path: 'templates/container.tsx', content: 'name' },
];

const existsSync = (path: string): boolean =>
  mockedFiles.map(({ path }) => path).includes(path);

const readFileSync = (path: string): Buffer => {
  const file = mockedFiles.find(file => file.path === path);
  return new Buffer(file ? file.content : '');
};

const writeFileSync = (path: string, content: string): void => {
  mockedFiles.push({ path, content });
};

const __getMockedFiles__ = (): MockedFile[] => mockedFiles;

// eslint-disable-next-line import/no-default-export
export default {
  existsSync,
  readFileSync,
  writeFileSync,
  __getMockedFiles__,
};
