import chalk from "chalk";
import { execSync } from "child_process";

const init = () => {
  console.log(
    chalk.cyan(`
    __      __    _                _    _ _____
    \\ \\    / /   | |              | |  | |_   _|
     \\ \\  / /   _| | __ _ _   _   | |  | | | |  
      \\ \\/ / | | | |/ _\` | | | |  | |  | | | |  
       \\  /| |_| | | (_| | |_| |  | |__| |_| |_ 
        \\/  \\__,_|_|\\__,_|\\__, |   \\____/|_____|
                     __/ | __/ |                
                    |___/ |___/                 
  `)
  );
};

export default init;
