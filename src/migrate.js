
const fs = require("fs/promises");
const path = require("path");
const pool = require("./db");

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
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename TEXT PRIMARY KEY,
        run_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    console.log("Migration history table is ready.");

    const files = await getMigrationFiles();

    console.log("Migration files found:");

    for (const file of files) {
      console.log(file);

      const result = await pool.query(
        "SELECT filename FROM schema_migrations WHERE filename = $1",
        [file]
      );

      if (result.rows.length > 0) {
        console.log(`Skipping ${file} - already executed`);
        continue;
      }

      const filePath = path.join(migrationsDirectory, file);
      const sql = await fs.readFile(filePath, "utf8");

      const client = await pool.connect();

      try {
        await client.query("BEGIN");

        await client.query(sql);

        await client.query(
          "INSERT INTO schema_migrations (filename) VALUES ($1)",
          [file]
        );

        await client.query("COMMIT");

        console.log(`Migration completed: ${file}`);
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
      }
    }

    console.log("All migrations processed.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Migration runner failed:", error);
  process.exitCode = 1;
});

