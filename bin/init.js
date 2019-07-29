#!/usr/bin/env node

const program = require("commander");
const handlebars = require("handlebars");
handlebars.registerHelper("toLowerCase", str => str.toLowerCase());
handlebars.registerHelper("toUpperCase", str => str.toUpperCase());
handlebars.registerHelper(
  "capitalize",
  str => str.charAt(0).toUpperCase() + str.slice(1)
);
program
  .version(require("../package").version, "-v, --version")
  .command("generate <type> <name> ")
  .option("-f, --functional", "functional component")
  .alias("g")
  .description(
    "Generate new file of one of the types:\n -action \n -reducer \n- store \n -container \n -functional component \n -class component"
  )
  .action(() => {
    require("./generate");
  });

program.on("command:*", () => {
  console.log(
    console.error(
      "Invalid command \nSee --help for a list of available commands."
    )
  );
  process.exit(1);
});

if (process.argv.length > 6) {
  console.error(
    "Invalid command!\nSee --help for a list of available commands."
  );
  process.exit(1);
  return;
}
program.parse(process.argv);
