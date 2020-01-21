const path = require('path');
const fs = require('fs');
const exec = require('await-exec');

const config = require('../config');

const projectTemplateSrc = path.join(__dirname, '..', config.projectTemplateDir);

const cloneProjectTemplate = async () => {
  if (!fs.existsSync(projectTemplateSrc)) {
    try {
      await exec(
        `
          git clone ${config.projectTemplateRepositoryUrl} --branch ${config.projectTemplateVersion} ${projectTemplateSrc}
        `,
        (err, stdout) => {
          console.log(stdout);
        },
      );

      await exec(
        `
          rm -R ${projectTemplateSrc}/.git
        `,
        (err, stdout) => {
          console.log(stdout);
        },
      );
    } catch(err) {
      console.error(err);
    }

    console.log('Successfully cloned template repository');
    return
  }
}

module.exports=cloneProjectTemplate;