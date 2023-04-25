#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import axios from "axios";

let username;
let points = 0;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const askName = async () => {
  console.log(
    chalk.green(figlet.textSync("Web Dev Trivia", { horizontalLayout: "full" }))
  );

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

const handleAnswer = async (isCorrect, correctAnswer) => {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    points++;
    spinner.success({
      text: chalk.green(`You got it, ${username}! 🎉`),
    });
  } else {
    spinner.error({
      text: chalk.red(
        `Oops, the correct answer was ${correctAnswer}. Better luck next time, ${username}! 💻`
      ),
    });
    process.exit(1);
  }
};

const getQuestionFromAPI = async () => {
  const { data } = await axios.get(
    "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple"
  );

  const { question, correct_answer, incorrect_answers } = data.results[0];

  const choices = [...incorrect_answers, correct_answer].sort();

  const answers = await inquirer.prompt({
    name: "question",
    type: "list",
    message: chalk.yellow.bold(question),
    choices: choices.map((choice) => choice),
  });

  return handleAnswer(
    answers.question == correct_answer,
    chalk.green(correct_answer)
  );
};

const winner = () => {
  console.clear();
  console.log(
    chalk.green(
      figlet.textSync(`Congratulations, ${username}!`, {
        font: "Isometric1",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(
    chalk.green.bold(`🎉🎉🎉 You scored ${points} point(s), web wizard! 🎉🎉🎉`)
  );
};

const playGame = async () => {
  await askName();

  console.log(
    chalk.green(
      `Welcome ${username}! Let's test your web development knowledge with some trivia.`
    )
  );

  for (let i = 0; i < 3; i++) {
    console.log(chalk.blue(`\nQuestion ${i + 1}:`));
    await getQuestionFromAPI();
    console.log(chalk.yellow(`Current Score: ${points}`));
  }

  winner();
};

playGame();
