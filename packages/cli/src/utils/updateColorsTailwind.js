import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceConfigPath = path.join(
  __dirname,
  "../../../core/tailwind.config.ts"
);

export const updateColorsTailwind = () => {
  fs.readdir(process.cwd(), (err, files) => {
    if (err) {
      console.error(
        chalk.red("✗"),
        chalk.white(
          "An error occurred while attempting to read the current directory:",
          err
        )
      );
      return;
    }

    const tailwindConfigFile = files.find((file) =>
      file.startsWith("tailwind.config")
    );

    if (!tailwindConfigFile) {
      console.error(
        chalk.red("✗"),
        chalk.white("No Tailwind configuration file found.")
      );
      return;
    }

    const tailwindConfigPath = path.join(process.cwd(), tailwindConfigFile);

    // Read the source Tailwind config file
    fs.readFile(sourceConfigPath, "utf8", (err, sourceData) => {
      if (err) {
        console.error(
          chalk.red("✗"),
          chalk.white(
            "An error occurred while attempting to read the source Tailwind configuration file:",
            err
          )
        );
        return;
      }

      // Write the source config to the target config file
      fs.writeFile(tailwindConfigPath, sourceData, "utf8", (err) => {
        if (err) {
          console.error(
            chalk.red("✗"),
            chalk.white(
              "An error occurred while attempting to write the Tailwind configuration file:",
              err
            )
          );
          return;
        }

        console.log(
          chalk.green("✓"),
          chalk.white.bold("Tailwind configuration file updated successfully.")
        );
      });
    });
  });
};

export default updateColorsTailwind;
