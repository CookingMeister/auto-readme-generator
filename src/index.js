// Packages needed for this application
import validator from "validator";
import inquirer from "inquirer";
import fs from "fs";

// Array of questions for user input, validated for empty responses and correct email format
const promptQuestions = async () => {
  try {
    const answers = await inquirer
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
    ]);
    return answers;
  } catch (err) {
    console.log(err);
    throw err;
  }
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

// Generate license section based on license selected
const renderLicenseSection = (license) => {
  return renderLicenseBadge(license);
};

// Generate badge and link for license section
const renderLicenseBadge = (license) => {
  // remove numbers and hyphens from license
  const charsOnlyLicense = license.replace(/[0-9-]/g, "");
  return license === "None"
    ? "No license selected at this time."
    : `[![badge](https://img.shields.io/badge/license-${license}-brightgreen.svg)](https://opensource.org/licenses/${license.toLowerCase()})
    
This project is licensed under the ${charsOnlyLicense} license.`;
};

// Function to initialize the app
const init = async () => {
  try {
    // Wait for all questons to be answered
    const answers = await promptQuestions();
    const readme = generateREADME(answers);
    // Wait for above to be completed then write file
    await fs.promises.writeFile("README.md", readme);
    console.log("README created!");
  } catch (err) {
    console.log("Error creating README:", err);
    throw err;
  }
};

// Initialize app
init();