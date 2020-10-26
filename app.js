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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = []
   

function main(){

    inquirer.prompt([
        {
          type: "input",
          message: "What is their name?",
          name: "name",
            validate: function (answer) {
              if (answer.length < 1) {
                return console.log(
                  "Please enter their name."
                );
              }
              return true;
              },
        },
        {
            type: "list",
            message: "What is their role:",
            name: "role",
            choices: ["Manager", "Engineer", "Intern", "Analyst"]
          },
        {
          type: "input",
          message: "What is their id number:",
          name: "id",
        },
    
        {
          type: "input",
          message: "What is their email address:",
          name: "email",
          
        },
        {
          type: "number",
          name: "officeNumber",
          message: "Enter the employee's office phone number:",
          when: function(answers) {
                return answers.role === "Manager";
                }
          },
          {
            type: "number",
            name: "officeNumber",
            message: "Enter the employee's office phone number:",
            when: function(answers) {
                  return answers.role === "Analyst";
                  }
            },
        {
          type: "input",
          name: "github",
          message: "Enter the employee's GitHub username:",
          when: function(answers) {
                return answers.role === "Engineer";
          }
        },
        {
          type: "input",
          name: "school",
          message: "Enter the employee's school name:",
          when: function(answers) {
                return answers.role === "Intern";
            }
        },
        {
          type: "list",
          message: "Add another employee?",
          name: "another",
          choices: ["Yes", "No"],
        },
      ]).then (function(ans){
        if(ans.role === 'Manager' ){
          employees.push(new Manager(ans.name, ans.id, ans.email, ans.officeNumber))
      }
      if(ans.role === 'Analyst' ){
        employees.push(new Analyst(ans.name, ans.id, ans.email, ans.officeNumber))
    }
        if(ans.role === 'Engineer' ){
            employees.push(new Engineer(ans.name, ans.id, ans.email, ans.github))
        }
        if(ans.role === 'Intern' ){
            employees.push(new Intern(ans.name, ans.id, ans.email, ans.school))
        }




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


       
console.log(ans.another)
if(ans.another === 'Yes'){
    main()
}
if(ans.another === 'No'){
  const html = render(employees)
  console.log(html);
// }



// CREATE HTML
var fileName = outputPath;
var stream = fs.createWriteStream(fileName);

stream.once('open', function(fd) {
  // var html = buildHtml();

  stream.end(html);
});
}
} 
)
}
main()

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
