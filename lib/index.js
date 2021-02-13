const fs = require("fs-extra");
const path = require("path");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function makeid(length) {
  const result = "";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function main() {
  const dir = process.argv[2];
  if (!(await fs.pathExists(dir))) {
    throw new Error("No such dir:" + dir);
  }
  const files = await fs.readdir(dir);
  await Promise.all(
    files.map(async (f) => {
      const original = path.join(dir, f);
      const stat = await fs.stat(original);
      if (stat.isFile()) {
        await fs.move(original, path.join(dir, makeid(8) + path.extname(f)));
      }
    })
  );
}

main().then(
  () => console.log("done."),
  (error) => console.error("failed.", error)
);
