const Manager = require("./lib/Manager");
const Analyst = require("./lib/Analyst");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// SOURCE USER INPUT

function main() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
        validate: function (answer) {
          const pass = answer.match(/^[a-zA-Z\s]+$/i);
          if (pass) {
            return true;
          }
          return "Name must contain letters and spaces only.";
        },
      },
      {
        type: "list",
        message: "What is their role?",
        name: "role",
        choices: ["Manager", "Analyst", "Engineer", "Intern"],
      },
      {
        type: "input",
        message: "Enter their staff ID number:",
        name: "id",

        validate: function (answer) {
          const pass = answer.match(/^\d+$/i);
          if (pass) {
            return true;
          }
          return "Staff numbers must contain numeric charachters only.";
        },
      },

      {
        type: "input",
        message: "Enter their email address:",
        name: "email",
        validate: function (answer) {
          const pass = answer.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
          if (pass) {
            return true;
          }
          return "Email address must conation @ and a dot.";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the employee's office phone number:",
        when: function (answers) {
          return answers.role === "Manager";
        },
        validate: function (answer) {
          const pass = answer.match(/^\d{5,10}$/i);
          if (pass) {
            return true;
          }
          return "Phone number must be numeric and between 5 - 10 digits.";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the employee's office phone number:",
        when: function (answers) {
          return answers.role === "Analyst";
        },
        validate: function (answer) {
          const pass = answer.match(/^\d{5,10}$/i);
          if (pass) {
            return true;
          }
          return "Phone number must be numeric and between 5 - 10 digits.";
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter the employee's GitHub username:",
        when: function (answers) {
          return answers.role === "Engineer";
        },
        validate: function (answer) {
          const pass = answer.match(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i);
          if (pass) {
            return true;
          }
          return "Username must be alphanumeric, but can contain a dash '-'. Do not include @ or any other special charachter.";
        },
      },
      {
        type: "input",
        name: "school",
        message: "What school does the intern attend?",

        when: function (answers) {
          return answers.role === "Intern";
        },
        validate: function (answer) {
          const pass = answer.match(/^[a-zA-Z0-9\d]+$/i);
          if (pass) {
            return true;
          }
          return "School must contain letters and spaces only.";
        },
      },
      {
        type: "list",
        message: "Would you like to add another employee?",
        name: "another",
        choices: ["Yes", "No"],
      },
    ])
    .then(function (ans) {
      if (ans.role === "Manager") {
        employees.push(
          new Manager(ans.name, ans.id, ans.email, ans.officeNumber)
        );
      }
      if (ans.role === "Analyst") {
        employees.push(
          new Analyst(ans.name, ans.id, ans.email, ans.officeNumber)
        );
      }
      if (ans.role === "Engineer") {
        employees.push(new Engineer(ans.name, ans.id, ans.email, ans.github));
      }
      if (ans.role === "Intern") {
        employees.push(new Intern(ans.name, ans.id, ans.email, ans.school));
      }

      // RENDER HTML

      console.log(ans.another);
      if (ans.another === "Yes") {
        main();
      }
      if (ans.another === "No") {
        const html = render(employees);
        console.log(html);

        // CREATE HTML
        var fileName = outputPath;
        var stream = fs.createWriteStream(fileName);

        stream.once("open", function (fd) {
          stream.end(html);
        });
      }
    });
}
main();
