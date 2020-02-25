import fs from 'fs-extra';
import { CI, ciConfigPathPerCi } from 'config';
import path from 'path';
import yaml from 'js-yaml';
import { getOutputDirectory } from 'helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UniversalCiConfig = any;

const updateGitlabConfig = (ciConfig: UniversalCiConfig): UniversalCiConfig => {
  const {
    image: _removedImage,
    run_integration_tests: _removedScript,
    ...updatedCiConfig
  } = ciConfig;

  return updatedCiConfig;
};

const updateBitbucketConfig = (
  ciConfig: UniversalCiConfig,
): UniversalCiConfig => {
  const { image: _removedImage, pipelines, ...rest } = ciConfig;

  const [defaultPipeline] = pipelines.default;

  const filterPipelineScripts = (s: string): boolean =>
    !['yarn cypress install', 'yarn cy:ci'].includes(s);

  const updatedCiConfig = {
    ...rest,
    pipelines: {
      ...pipelines,
      default: [
        {
          ...defaultPipeline,
          step: {
            ...defaultPipeline.step,
            script: defaultPipeline.step.script.filter(filterPipelineScripts),
          },
        },
      ],
    },
  };

  return updatedCiConfig;
};

const updateCircleConfig = (ciConfig: UniversalCiConfig): UniversalCiConfig => {
  const { docker: _, ...build } = ciConfig.jobs.build;
  const buildSteps = build.steps.filter(
    ({ run }: { run?: { name: string } }) =>
      !run || run.name !== 'Run integration tests',
  );

  const updatedCiConfig = {
    ...ciConfig,
    jobs: {
      ...ciConfig.jobs,
      build: {
        ...build,
        steps: buildSteps,
      },
    },
  };

  return updatedCiConfig;
};

const updateFactory: Record<
  Exclude<CI, 'none'>,
  (ci: UniversalCiConfig) => UniversalCiConfig
> = {
  gitlab: updateGitlabConfig,
  bitbucket: updateBitbucketConfig,
  circle: updateCircleConfig,
};

export type UpdateCiFiles = (includeCypress: boolean, ci: CI) => void;

export const updateCiFiles: UpdateCiFiles = (includeCypress, ci) => {
  if (ci === 'none' || includeCypress) return;

  console.log('Updating CI config files...');

  const ciConfigPath = path.join(getOutputDirectory(), ciConfigPathPerCi[ci]);
  const ciConfig = yaml.safeLoad(
    fs.readFileSync(ciConfigPath, 'utf8').toString(),
    {
      schema: yaml.DEFAULT_FULL_SCHEMA,
    },
  );

  const updater = updateFactory[ci];
  const updatedConfig = updater(ciConfig);

  fs.writeFileSync(ciConfigPath, yaml.safeDump(updatedConfig));

  console.log('CI files updated!');
};
