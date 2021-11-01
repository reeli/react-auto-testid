import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const DEFAULT_TESTID_ROOT = "testid-root";
const DEFAULT_TESTID_KEY = "data-testid";

const questions = [
  {
    type: "list",
    name: "runtime",
    message: "Which jsx runtime you want to use?",
    choices: ["react", "emotion"],
  },
  {
    type: "input",
    name: "testidRoot",
    message: "Which key you want to use for test id root?",
    default: DEFAULT_TESTID_ROOT,
    validate(input: any) {
      if (!input || typeof input !== "string") {
        return "Please input a name for your test id root!";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "testidKey",
    message: "Which key you want use for auto generated ids?",
    default: DEFAULT_TESTID_KEY,
    validate(input: any) {
      if (!input || typeof input !== "string") {
        return "Please input a name for auto generated ids!";
      }
      return true;
    },
  },
];

inquirer.prompt(questions).then((answers: any) => {
  fs.writeFileSync(path.resolve(process.cwd(), "react-auto-testid.config.json"), JSON.stringify(answers, null, 2));
});
