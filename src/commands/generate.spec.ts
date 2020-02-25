import { generateCommandFactory } from 'commands';
import path from 'path';
import { UnexpectedCommandArgumentError } from 'errors';

const generateComponent = jest.fn();
const generateStore = jest.fn();

const generateCommandMock = generateCommandFactory({
  generateComponent,
  generateStore,
});

it('should throw `UnexpectedCommandArgumentError`', async () => {
  expect(
    generateCommandMock({
      name: 'test',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: 'wrongType' as any,
      functional: true,
    }),
  ).rejects.toEqual(new UnexpectedCommandArgumentError('type'));
});

it('should call `generateStore` service', async () => {
  const name = 'articles';
  await generateCommandMock({
    name,
    type: 'store',
  });

  expect(generateStore).toBeCalledWith(path.basename(name), path.dirname(name));
});

it('should call `generateComponent` service', async () => {
  const name = 'articles';
  const type = 'component';
  const functional = true;

  await generateCommandMock({
    name,
    type,
    functional,
  });

  expect(generateComponent).toBeCalledWith(
    type,
    functional,
    path.basename(name),
    path.dirname(name),
  );
});
