const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validator = require('email-validator');
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function init(){
    inquirer.prompt([
        {
            type: "list",
            message: "Hello! Welcome to the employee summary creator. What would you like to do?",
            name:"choice",
            choices:["Create employee card.", "Export cards to HTML file.", "Quit"]
        }
    ]).then(({choice})=>{
        switch (choice) {
            case "Create employee card.":
                createCard();
                break;

            case "Export cards to HTML file.":
                if(employees.length === 0){
                    console.log("Please create at least one employee card.")
                    init();
                } else {
                    createHTML();
                }
                break;
            
            case "Quit":
                console.log("Thank you for using Employee Summary Creator!")
                break;
        }
    })
}

function createCard(){
    inquirer.prompt([
        {
            type:"list",
            message:"What is the employees job type?",
            name:"job",
            choices:['Manager', 'Engineer', 'Intern']
        },
    ]).then(({job})=>{
        switch (job) {
            case 'Manager':
                createManager();
                break;
            
            case 'Engineer':
                createEngineer();
                break;
            
            case 'Intern':
                createIntern();
                break;
        }
    })
}

function createManager(){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"What is the manager's name?",
        },
        {
            type:"input",
            name:"id",
            message:"What is the manager's id?"
        },
        {
            type:"input",
            name:"email",
            message:"What is the manager's email?",
            validate: function (email) {
  
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    
                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email")
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"office",
            message:"What is the manager's office number?",
        },
    ]).then(answers=>{
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.office)
        employees.push(newManager);
        init();
    })
}

function createEngineer(){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"What is the engineer's name?",
        },
        {
            type:"input",
            name:"id",
            message:"What is the engineer's id?"
        },
        {
            type:"input",
            name:"email",
            message:"What is the engineer's email?",
            validate: function (email) {
  
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    
                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email")
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"github",
            message:"What is the engineer's github?",
        },
    ]).then(answers=>{
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        employees.push(newEngineer);
        init();
    })
}

function createIntern(){
    inquirer.prompt([
        {
            type:"input",
            name:"name",
            message:"What is the intern's name?",
        },
        {
            type:"input",
            name:"id",
            message:"What is the intern's id?"
        },
        {
            type:"input",
            name:"email",
            message:"What is the intern's email?",
            validate: function (email) {
  
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    
                if (valid) {
                    return true;
                } else {
                    console.log(".  Please enter a valid email")
                    return false;
                }
            }
        },
        {
            type:"input",
            name:"school",
            message:"What is the intern's school?",
        },
    ]).then(answers=>{
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
        employees.push(newIntern);
        init();
    })
}

function createHTML(){
    fs.writeFile("./output/team.html", render(employees), (err) => {
        if(err){
            throw err
        } else {
            console.log("Your HTML page is created!")
        }
    })
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
init();