import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import axios from "axios";
import figlet from "figlet";

let points = 0;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const handleAnswer = async (isCorrect, correctAnswer, username) => {
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

const getQuestionFromAPI = async (username) => {
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
    chalk.green(correct_answer),
    username
  );
};

const winner = (username) => {
  console.clear();
  console.log(
    chalk.green(
      figlet.textSync(`Congrats, ${username}!`, {
        font: "Small",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(
    chalk.green.bold(`🎉🎉🎉 You scored ${points} points, web wizard! 🎉🎉🎉`)
  );
};

export const playGame = async (username) => {
  for (let i = 0; i < 3; i++) {
    console.log(chalk.blue(`\nQuestion ${i + 1}:`));
    await getQuestionFromAPI(username);
    console.log(chalk.yellow(`Current Score: ${points}`));
  }

  winner(username);
};
