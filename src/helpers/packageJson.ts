export type PackageJson = {
  dependencies?: { [k: string]: string };
  devDependencies?: { [k: string]: string };
  scripts?: { [k: string]: string };
};

export const removeDevDependency = (devDependency: string) => (
  packageJson: PackageJson,
): PackageJson => {
  if (!packageJson.devDependencies) return packageJson;

  const {
    [devDependency]: _removedDep,
    ...devDependencies
  } = packageJson.devDependencies;

  return {
    ...packageJson,
    devDependencies,
  };
};

export const removeDependency = (dependency: string) => (
  packageJson: PackageJson,
): PackageJson => {
  if (!packageJson.dependencies) return packageJson;

  const {
    [dependency]: _removedDep,
    ...dependencies
  } = packageJson.dependencies;

  const { devDependencies } = removeDevDependency(`@types/${dependency}`)(
    packageJson,
  );

  return {
    ...packageJson,
    dependencies,
    devDependencies,
  };
};

export const removeScript = (script: string) => (
  packageJson: PackageJson,
): PackageJson => {
  if (!packageJson.scripts) return packageJson;

  const { [script]: _removedScript, ...scripts } = packageJson.scripts;

  return {
    ...packageJson,
    scripts,
  };
};
