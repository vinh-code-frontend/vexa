import { logger } from "./logger.mjs";

import { execSync } from "child_process";

const run = () => {
  try {
    const cwd = "apps/api/src/Vexa.Infrastructure";
    const cmd = `dotnet ef migrations remove --startup-project ../Vexa.Api`;

    logger.success(`Running: ${cmd}...`);
    execSync(cmd, { cwd, stdio: "inherit" });
    logger.success(`Migrations was removed succesfully!`);
  } catch (error) {
    logger.error("Error while removing migration");
  }
};

run();
