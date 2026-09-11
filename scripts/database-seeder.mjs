import { logger } from "./logger.mjs";

import { execSync } from "child_process";

const run = () => {
  try {
    const cwd = "apps/api/src/Vexa.Api";
    const cmd = "dotnet run -- seed";

    logger.success(`Running: ${cmd}...`);
    execSync(cmd, { cwd, stdio: "inherit" });
    logger.success(`Database updated successfully!`);
  } catch (error) {
    logger.error("Error while updating database");
  }
};

run();
