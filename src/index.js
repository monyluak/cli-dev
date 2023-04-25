#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { playGame } from "./game.js";

let username;

console.log(
  chalk.green(figlet.textSync("Web Dev Trivia", { horizontalLayout: "full" }))
);

const askName = async () => {
  const answers = await inquirer.prompt({
    name: "username",
    type: "input",
    message: chalk.blue.bold(`What's your name, web warrior?`),
    default() {
      return "Dev";
    },
  });

  username = answers.username;
};

const startGame = async () => {
  await askName();

  console.log(
    chalk.green(
      `Welcome ${username}! Let's test your web development knowledge with some trivia.`
    )
  );

  await playGame(username);

  console.log(chalk.green.bold(`Thanks for playing, ${username}!`));
  process.exit(0);
};

startGame();
