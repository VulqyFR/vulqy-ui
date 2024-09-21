import chalk from "chalk";
import { execSync } from "child_process";
import figlet from "figlet";
import inquirer from "inquirer";
import { detectFramework } from "../utils/detectFramework.js";
import { updateCSSFile } from "../utils/updateCSSFile.js";
import { updateColorsTailwind } from "../utils/updateColorsTailwind.js";

/*
 * Initialize VulqyUI in the project.
 */
const init = async () => {
  // Display logo
  console.log(
    chalk.cyan(
      figlet.textSync("VulqyUI", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  // Framework detection
  const framework = detectFramework();
  if (!framework) {
    console.log(
      chalk.red("✗"),
      chalk.white("No supported framework detected.")
    );
    process.exit(1); // Exit if no framework
  }

  // User prompts
  const { addTheme, addColorsTailwind } = await inquirer.prompt([
    {
      type: "confirm",
      name: "addTheme",
      message:
        "Add theme to the main CSS file? (Recommended to avoid styling issues)",
      default: true,
    },
    {
      type: "confirm",
      name: "addColorsTailwind",
      message: "Add colors to Tailwind config?",
      default: true,
    },
  ]);

  // Update CSS if confirmed
  if (addTheme) {
    updateCSSFile(framework);
  }

  // Update Tailwind config if confirmed
  if (addColorsTailwind) {
    updateColorsTailwind();
  }

  // Install dependencies
  try {
    console.log(chalk.blue("🛈"), chalk.white("Installing dependencies..."));
    execSync("npm i clsx tailwind-merge tailwindcss-animate", {
      stdio: "inherit",
    });
    console.log(chalk.green("✓"), chalk.white.bold("Dependencies installed."));
  } catch {
    console.log(chalk.red("✗"), chalk.white("Dependency installation failed."));
    process.exit(1); // Exit if installation fails
  }

  // Success message
  console.log(chalk.green("✓"), chalk.white.bold("VulqyUI initialized."));
};

export default init;
