const fs = require("fs");
const render = require("consolidate").handlebars.render;
const mkdirp = require("mkdirp");
const updateRootStore = require("./updateRootStore");

const generateFile = (name, src, dest, type) => {
  if (!fs.existsSync(`${process.cwd()}${dest}`)) {
    mkdirp(`${process.cwd()}${dest}`);
  }

  const file = fs.readFileSync(src);

  const renderFile = () => render(file.toString(), { name });

  renderFile()
    .then(res => {
      try {
        let fileName = type === "index" ? type : `${name}.${type}`;

        if (fileName.includes("functional") || fileName.includes("class")) {
          fileName = fileName.replace(/.functional/, "").replace(/.class/, "");
        }
        fs.writeFileSync(`${process.cwd()}${dest}/${fileName}.ts`, res);

        if (src.includes("reducer.ts")) {
          updateRootStore(name);
        }

        console.log(`Successfully generated ${fileName}.ts file`);
      } catch (error) {
        console.error(error);
      }
    })
    .catch(err => {
      throw err;
    });
};

module.exports = generateFile;
