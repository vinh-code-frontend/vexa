import { logger } from "./logger.mjs";

import { execSync } from "child_process";

const run = () => {
  try {
    const name = process.argv[2];

    if (!name) {
      console.error("Usage: npm run mgt:add <MigrationName>");
      process.exit(1);
    }

    const cwd = "apps/api/src/Vexa.Infrastructure";
    const cmd = `dotnet ef migrations add ${name} --startup-project ../Vexa.Api`;

    logger.success(`Running: ${cmd}...`);
    execSync(cmd, { cwd, stdio: "inherit" });
    logger.success(`Migration ${name} was added succesfully!`);
  } catch (error) {
    logger.error("Error while adding migration");
  }
};

run();
