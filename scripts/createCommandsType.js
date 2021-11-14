const fs = require("fs");
const path = require("path");

const abeilleDir = process.argv[2];
if (!abeilleDir) {
  throw "no abeilleDir provided: " + process.argv[1] + " ../path/to/abeille";
}

const commandsDir = path.resolve(abeilleDir, "./core/config/commands");

const files = fs.readdirSync(commandsDir).reduce((acc, cur) => {
  const next = path.join(commandsDir, cur);
  if (!fs.lstatSync(next).isDirectory() && next.endsWith(".json")) {
    return [...acc, cur.substring(0, cur.indexOf(".json"))];
  }
  return acc;
}, []);

const text = `type CommandName = "${files.join('" | "')}";`;

const generatedFilePath = path.resolve(
  __dirname,
  "../AutoGenerateCommands.d.ts"
);

fs.writeFileSync(generatedFilePath, text);
