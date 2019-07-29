#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const program = require("commander");
const generateFile = require("../helpers/generateFile");

const name = program.args[1];
let dest = path.resolve(__dirname, "/src/app");
let type = program.args[0];

const shouldBeFunctionalComponent = program.commands[0].functional;
const storeScaffords = ["action", "reducer", "selectors", "index"];

if (type === "store") {
  dest += `/store/${name}`;

  for (const scaffold of storeScaffords) {
    const testTemplate = path.join(
      __dirname,
      `../templates/store/spec/${scaffold}.test.ts`
    );

    const template = path.join(__dirname, `../templates/store/${scaffold}.ts`);

    if (scaffold && name) {
      generateFile(name, template, dest, scaffold);
    }

    if (fs.existsSync(testTemplate)) {
      const newDest = path.resolve(__dirname, `/src/app/store/${name}/spec`);
      generateFile(name, testTemplate, newDest, scaffold + ".test");
    }
  }
} else {
  const testPath = path.join(__dirname, `../templates/${type}.test.ts`);

  if (fs.existsSync(testPath)) {
    generateFile(name, testPath, dest, "test");
  }

  if (type === "component" && shouldBeFunctionalComponent) {
    type += ".functional";
  } else if (type === "component") {
    type += ".class";
  }

  const scaffold = path.join(__dirname, `../templates/${type}.ts`);

  if (scaffold && name) {
    generateFile(name, scaffold, dest, type);
  }
}
