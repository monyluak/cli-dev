# Web Dev Trivia
Web Dev Trivia is a command-line tool built with Node.js that tests your web development knowledge with trivia questions.

## Installation
1. Install Node.js.
2. Clone this repository or download and extract the ZIP file.
3. Open a terminal and navigate to the project directory.
4. Install dependencies with the following command:

```
npm install
```

## Usage
To start the game, run the following command:

```
npm start
```
You will be prompted to enter your name, and then the game will begin. You will be asked three multiple-choice questions about web development. Each correct answer is worth one point.

After three questions, your final score will be displayed, and you will have the option to play again or exit.

## Credits
Web Dev Trivia uses the [Open Trivia DB API](https://opentdb.com) to fetch the questions. It also relies on the following Node.js packages:

- [chalk](https://www.npmjs.com/package/chalk) for colorful terminal output
- [inquirer](https://www.npmjs.com/package/inquirer) for prompting users for input
- [nanospinner](https://www.npmjs.com/package/nanospinner) for creating spinners during async tasks
- [figlet](https://www.npmjs.com/package/figlet) for ASCII art text formatting

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).
