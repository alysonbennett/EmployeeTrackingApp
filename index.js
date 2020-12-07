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

  
// Add a department to the table
function addDepartment() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runPrompts();
            }
        )
    })
  }

// function addRole
function addRole() { 
    inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What Role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of your new role?"
        },
        {
            name: "department",
            type: "input",
            message: "What is the department ID of your new role?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO role SET ? ",
            {
              title: res.title,
              salary: res.salary,
              department_id: res.department
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runPrompts();
            }
        )
    })
  }

// function addEmployee
function addEmployee() { 
    inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the first name of your new employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the last name of your new employee?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the role ID for your new employee?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the manager ID for your new employee?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO role SET ? ",
            {
              first_name: res.first_name,
              last_name: res.last_name,
              role_id: res.role_id,
              manager_id: res.manager_id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                runPrompts();
            }
        )
    })
  }

// function viewDepartment
function viewDepartment() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }

// function viewRole
function viewRole() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  }

// function viewEmployees
function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      runPrompts()
  })
}

// function updateEmployee
