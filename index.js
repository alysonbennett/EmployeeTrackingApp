const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeesDB"
});

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
            "View employee",
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
            case "View employee":
                viewEmployee();
                break
            case "Update employee roles":
                updateEmployee();
                break
          }
      });
  }