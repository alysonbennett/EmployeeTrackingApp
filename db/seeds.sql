INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Production");
INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Executive", 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 900000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Site Lead", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Hand", 50000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Business Manager", 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amanda", "Alexander", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carmen", "Medina", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Derek", "Benson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rich", "Bass", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marshall", "Yoder", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Shirey", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Meghan", "Wilson", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Davis", 6, null);