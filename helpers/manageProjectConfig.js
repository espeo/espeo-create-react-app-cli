const fs = require('fs');

const filesManager = require('./filesManager');

const getConfig = () => {
  const configDest = filesManager.getOutputFile('.espeo-cli');
  if (fs.existsSync(configDest)) {
    const configFile = fs.readFileSync(configDest);
    const projectConfig = JSON.parse(configFile);
    return projectConfig;
  }
  return null;
}

const generateConfig = (config, outputPath) => {
  const configDest = filesManager.getOutputFile(`/${outputPath}/.espeo-cli`);
  const projectConfiguration = {
    ...getConfig(),
    ...config
  }

  fs.writeFileSync(
    configDest,
    JSON.stringify(projectConfiguration, null, 2)
  );
}

module.exports = {
  getConfig,
  generateConfig
}