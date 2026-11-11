const fs = require("fs/promises");
const path = require("path");

const migrationsDirectory = path.join(
  __dirname,
  "..",
  "migrations"
);

async function getMigrationFiles() {
  const files = await fs.readdir(migrationsDirectory);

  return files
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

async function main() {
  const files = await getMigrationFiles();

  console.log("Migration files found:");

  for (const file of files) {
    console.log(file);
  }
}

main().catch((error) => {
  console.error("Migration runner failed:", error);
  process.exitCode = 1;
});
