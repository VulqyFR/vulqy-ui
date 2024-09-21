#!/usr/bin/env node
import { Command } from "commander";
import add from '../src/commands/add.js';
import init from '../src/commands/init.js';

const program = new Command();

program
  .command("init")
  .description("Initialize Vulqy-UI for your project")
  .action(() => {
    init();
  });

program
  .command("add <component>")
  .description("Add a Vulqy-UI component")
  .action(() => { 
    add();
  });

program.parse(process.argv);
