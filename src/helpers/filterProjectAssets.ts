import { CI } from 'config';

const ciConfigPathPerSupportedCi: Record<Exclude<CI, 'none'>, string> = {
  gitlab: '.gitlab-ci.yml',
  circle: '.circleci',
  bitbucket: 'bitbucket-pipelines.yml',
};

export const filterProjectAssets = (ci: CI, includeCy: boolean) => (
  assetPath: string,
): boolean => {
  const ciConfigFilesToRemove = Object.entries(ciConfigPathPerSupportedCi)
    .filter(([key]) => key !== ci)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, files]) => files);

  return (
    (includeCy ? true : !assetPath.includes('cypress')) &&
    !ciConfigFilesToRemove.some(file => assetPath.includes(file))
  );
};
