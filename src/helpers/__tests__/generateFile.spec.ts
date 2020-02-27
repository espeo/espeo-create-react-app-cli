import { generateFile } from 'helpers';
import { TemplateDoesNotExistsError, UnexpectedArgumentsError } from 'errors';
import fs from 'fs';

it('should throw TemplateDoesNotExistsError', async () => {
  expect(
    generateFile({
      targetName: '',
      targetPath: '',
      type: '',
      templateSrc: 'nonExistingTemplate',
    }),
  ).rejects.toEqual(new TemplateDoesNotExistsError('nonExistingTemplate'));
});

it('should throw UnexpectedArgumentsError', async () => {
  expect(
    generateFile({
      targetName: '',
      targetPath: '',
      type: '',
      templateSrc: 'templates/container.tsx',
    }),
  ).rejects.toEqual(
    new UnexpectedArgumentsError(['targetName', 'targetName', 'type']),
  );
});

it('should generate file', async () => {
  await generateFile({
    targetName: 'users',
    targetPath: 'src/Users',
    type: 'actions',
    templateSrc: 'templates/container.tsx',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lastCreatedFile = [...(fs as any).__getMockedFiles__()].pop();

  expect(lastCreatedFile).toEqual({
    path: './src/Users/store/actions/users.actions.tsx',
    content: 'users',
  });
});
