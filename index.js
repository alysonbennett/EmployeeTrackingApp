// Dependencies
const inquirer = require("inquirer");
const connection = require("./config/connection");

// Connects functions to prompts
const commands = {
    "View departments": function () { viewTable("department") },
    "View roles": () => viewTable("role"),
    "View employees": () => viewTable("employee"),
    "Add department": addDepartment,
    "Add role": addRole,
    "Add employee": addEmployee,
    // "Update employee roles": updateEmployeeRole,
    "All done": connection.end
}

// Additional prompts for adding content to the tables
const prompts = {
    menu: {
        message: "Menu",
        name: "key",
        type: "list",
        choices: Object.keys(commands)
    },
    addDepartment:
    {
        name: "name",
        type: "input",
        message: "What Department would you like to add?"
    },
    addRole: departments => [
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
            name: "department_id",
            type: "list",
            message: "What is the department ID of your new role?",
            choices: departments
        }
    ],
    addEmployee: (roles, managers) => [
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
            type: "list",
            message: "What is the role for your new employee?",
            choices: roles
        },
        {
            name: "manager_id",
            type: "list",
            message: "Who is the manager for your new employee?",
            choices: managers
        }
    ]
}

// Calls the __run__ function
__run__()

// Defines the run function
async function __run__() {
    try {
        const { key } = await inquirer.prompt(prompts.menu)
        commands[key]();
    } catch (err) {
        console.log(err)
    }
}

// Prompts that will be shown to the user on start
function runPrompts() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee roles",
            "All done"
        ]
    })
        .then(function (answer) {
            switch (answer.task) {                
                case "View departments":
                    viewTable("department");
                    break
                case "View roles":
                    viewTable("role");
                    break
                case "View employees":
                    viewTable("employee");
                    break
                case "Add department":
                    addDepartment();
                    break
                case "Add role":
                    addRole();
                    break
                case "Add employee":
                    addEmployee();
                    break
                case "Update employee role":
                    updateEmployeeRole();
                    break
                case "All done":
                    connection.end();
                    break
            }
        });
}


// Add a department to the tracker
function addDepartment() {
    inquirer.prompt(prompts.addDepartment)
        .then(function (res) {
            connection.query(
                "INSERT INTO department SET ? ",
                {
                    name: res.name
                },
                function (err, db) {
                    if (err) throw err
                    runPrompts();
                }
            )
        })
        .catch(function (err) {
            console.log(err)
        })
}

// Add a role to the tracker
function addRole() {
    let qry = "SELECT name, id AS value FROM department";
    connection.query(qry, function (err, departments) {
        if (err) throw err;

        inquirer.prompt(prompts.addRole(departments)).then(function (role) {
            const qry = "INSERT INTO role SET ? "
            connection.query(
                qry, role,
                function (err) {
                    if (err) throw err
                    runPrompts();
                }
            )
        })
    })

}

// Add an employee to the tracker
function addEmployee() {
    let qry = "SELECT title AS name, id AS value FROM role";
    connection.query(qry, function (err, roles) {
        if (err) throw err;
        qry = "SELECT CONCAT(last_name, \", \", first_name) AS name, id AS value FROM employee";
        connection.query(qry, function (err, managers) {
            if (err) throw err;

            inquirer.prompt(prompts.addEmployee(roles, managers))
                .then(function (employee) {
                    connection.query(
                        "INSERT INTO employee SET ? ", employee,
                        function (err) {
                            if (err) throw err
                            runPrompts();
                        }
                    )
                })
        })
    })
}

// Function to view table from the database
function viewTable(table) {
    const qry = "SELECT * FROM ??"
    connection.query(qry, [table], function (err, res) {
        if (err) throw err
        console.table(res)
        runPrompts()
    })
}

// Update employees' role (Still working through)
// function updateEmployeeRole() {
    
//     inquirer.prompt([
//         {
//             name: "name",
//             type: "list",
//             message: "Which employee would you like to update?",
//             choices: employee
//         }, {
//             name: "role",
//             type: "list",
//             message: "What is the new role for this employee?",
//             choices: role
//         }
//     ]).then(function (response) {
//         connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role, response.name], function (err, data) {
//             console.table(data);
//         })
//         runPrompts();
// });
// }
