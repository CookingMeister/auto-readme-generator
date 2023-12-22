// Packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const validator = require("validator");

// Array of questions for user input, validated for empty responses and correct email format
const promptQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Title cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a short description of your project:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Description cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "installation",
        message: "Provide installation instructions:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Installation instructions cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "usage",
        message: "Provide usage information and examples:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Usage information cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "credits",
        message: "Enter any credits or acknowledgements:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Credit section cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "contributing",
        message: "Provide contribution guidelines:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Guidelines cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "tests",
        message: "Provide instructions for running tests:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Testing instructions cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter your GitHub username:",
        validate: (input) => {
          if (validator.isEmpty(input)) {
            return "Username cannot be empty";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter your email address:",
        validate: (input) => {
          if (!validator.isEmail(input)) {
            return "Invalid email";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "license",
        message: "Choose a license for your project:",
        choices: ["MIT", "Apache--2", "GPL--3", "None"],
      },
    ])
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
// Generate a README file from the user input, return the content using template literals
const generateREADME = (answers) => {
    return `# ${answers.title}
  
  ## Description
  
  ${answers.description}
  
  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  - [License](#license)  
  
  ## Installation
  
  ${answers.installation}
  
  ## Usage
  
  ${answers.usage}
  
  ## Credits
  
  ${answers.credits}
  
  ## Contributing
  
  ${answers.contributing}
  
  ## Tests
  
  ${answers.tests}
  
  ## Questions
  
  If you have any questions about this project, please contact me at [${
      answers.email
    }](mailto:${
      answers.email
    }). More of my work can be viewed at [GitHub](https://github.com/${
      answers.github
    }).
  
  ## License
  
  ${renderLicenseSection(answers.license)}
  `;
  };