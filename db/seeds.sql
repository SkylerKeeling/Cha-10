use inventory_db;

INSERT INTO department (name)
VALUES ("Software"), ("Sales"), ("HR"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 100000, 1), ("Sales Representative", 100000, 2), ("HR person", 100000, 3), ("Lawyer", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Jones", 1, null), ("Jacque", "LeBlanc", 2, 1), ("Chandler", "Smith", 3, 1), ("Bob", "Ross", 3, 1), ("Lebron", "James", 4, 1);

