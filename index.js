const inquirer = require("inquirer");
// const consoleTable = require("console.table");
const connection = require("./config/connection");


const commands = {
    "View department": function () { viewTable("department") },
    "View role": () => viewTable("role"),
    "View employees": () => viewTable("employee"),
    "Add department": addDepartment,
    "Add role": addRole,
    "Add employee": addEmployee,
    "Update employee roles": () => false,
    "All done": connection.end
}

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

__run__()

async function __run__() {
    try {
        const { key } = await inquirer.prompt(prompts.menu)
        commands[key]();
    } catch (err) {
        console.log(err)
    }
}

// runPrompts();
function runPrompts() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View department",
            "View role",
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
                case "Add department":
                    addDepartment();
                    break
                case "Add role":
                    addRole();
                    break
                case "Add employee":
                    addEmployee();
                    break
                case "View department":
                    viewTable("department");
                    break
                case "View role":
                    viewTable("role");
                    break
                case "View employees":
                    viewTable("employee");
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

// function addRole
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

// function addEmployee
function addEmployee() {
    let qry = "SELECT title AS name, id AS value FROM role";
    connection.query(qry, function (err, roles) {
        if (err) throw err;
        // name = last_name + ", " + first_name
        qry = "SELECT CONCAT(last_name, \", \", first_name) AS name, id AS value FROM employee";
        connection.query(qry, function (err, managers) {
            if (err) throw err;

            inquirer.prompt(prompts.addEmployee(roles, managers))
                .then(function (employee) {
                    connection.query(
                        "INSERT INTO employee SET ? ", employee,
                        function (err) {
                            if (err) throw err
                            // console.table(res);
                            runPrompts();
                        }
                    )
                })
        })
    })
}

// function viewDepartment
function viewTable(table) {
    const qry = "SELECT * FROM ??"
    connection.query(qry, [table], function (err, res) {
        if (err) throw err
        console.table(res)
        runPrompts()
    })
}
// function viewDepartment() {
//     // const qry = "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;"

//     const qry = "SELECT * FROM department"
//     connection.query(qry, function (err, res) {
//         if (err) throw err
//         console.table(res)
//         runPrompts()
//     })
// }

// function viewRole
// function viewRole() {
    // connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    //     function (err, res) {
    //         if (err) throw err
    //         console.table(res)
    //         startPrompt()
    //     })

// }

// function viewEmployees
// function viewEmployees() {
//     connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
//         function (err, res) {
//             if (err) throw err
//             console.table(res)
//             runPrompts()
//         })
// }

// function updateEmployee
