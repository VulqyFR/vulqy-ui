import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getMainCSSPath } from "./getMainCSSPath.js";

export const updateCSSFile = (framework) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const src_css_path = path.join(
    __dirname,
    "../../../core/src/styles/globals.css"
  );
  const target_css_path = getMainCSSPath(framework);

  // Read the content of the source CSS file
  fs.readFile(src_css_path, "utf8", (err, srcContent) => {
    if (err) {
      console.error(
        chalk.red("✗"),
        chalk.white(
          "An error occured while attempting to read the CSS file at",
          src_css_path
        )
      );
      return;
    }

    // Check if the target CSS file exists, if not create it
    fs.access(target_css_path, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(path.dirname(target_css_path), { recursive: true }, (err) => {
          if (err) {
            console.error(
              chalk.red("✗"),
              chalk.white(
                `An error occured while attempting to create a CSS file at ${target_css_path}`
              )
            );
            return;
          }
        });
      }
    });

    // Read the content of the target CSS file
    fs.readFile(target_css_path, "utf8", (err, targetContent) => {
      if (err) {
        console.error(
          chalk.red("✗"),
          chalk.white(
            `An error occured while attempting to read the target ${target_css_path}:`,
            err
          )
        );
        return;
      }

      // Check if the target CSS file already contains the Tailwind directives
      const tailwindDirectives =
        /@tailwind\s+base;\s*@tailwind\s+components;\s*@tailwind\s+utilities;/g;
      if (tailwindDirectives.test(targetContent)) {
        targetContent = targetContent.replace(tailwindDirectives, srcContent);
      } else {
        targetContent = srcContent + "\n" + targetContent;
      }

      // Write the content of the source CSS file to the target CSS file
      fs.writeFile(target_css_path, targetContent, "utf8", (err) => {
        if (err) {
          console.error(
            chalk.red("✗"),
            chalk.white(
              `An error occured while attempting to write in ${target_css_path}`
            )
          );
        }
      });
    });
  });
};

export default updateCSSFile;
