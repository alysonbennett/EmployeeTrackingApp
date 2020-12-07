const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./config/connection");


connection.connect(function(err) {
    if (err) throw err;
    runPrompts();
});

function runPrompts() {
      inquirer.prompt({
          type: "list",
          name: "task",
          message: "What would you like to do?",
          choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View employees by department",
            "View employees by role",
            "View all employees",
            "Update employee roles",
            "All done"
          ]
      })
      .then(function(answer) {
          switch (answer.action) {
            case "Add department":
                addDepartment();
                break
            case "Add role":
                addRole();
                break  
            case "Add employee":
                addEmployee();
                break 
            case "View employees by department":
                viewDepartment();
                break
            case "View employees by role":
                viewRole();
                break
            case "View all employees":
                viewEmployees();
                break
            case "Update employee roles":
                updateEmployee();
                break
            case "All done":
                connection.end();
                break               
          }

        
      });
  }

  
// function addDepartment
// function addRole
// function addEmployee
// function viewDepartment
// function viewRole
// function viewEmployees
// function updateEmployee
