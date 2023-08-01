const inquirer = require("inquirer")
const db = require("./server")

function startApp() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What action do you want?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee roles",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.action) {
        case "View all departments":
          viewDepartments()
          break
        case "View all roles":
          viewRoles()
          break
        case "View all employees":
          viewEmployees()
          break
        case "Add a new department":
          addDepartment()
          break
        case "Add a new role":
          addRole()
          break
        case "Add a new employee":
          addEmployee()
          break
        case "Update employee roles":
          employeeUpdate()
          break
        case "Exit":
          connection.end()
          break
      }
    })
}

function viewDepartments() {
  db.query("select * from department", (err, res) => {
    if (err) {
      throw err
    }
    console.table(res)
    startApp()
  })
}
function viewRoles() {
  db.query("select * from role", (err, res) => {
    if (err) {
      throw err
    }
    console.table(res)
    startApp()
  })
}
function viewEmployees() {
  db.query("select * from employee", (err, res) => {
    if (err) {
      throw err
    }
    console.table(res)
    startApp()
  })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Enter name of department?",
      },
    ])
    .then(function (response) {
      db.query("insert into department set ?", {name: response.newDepartment})
      console.log("new department added")
      startApp()
    })
}

function addRole() {
  db.query("select * from department", (err, res) => {
    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "Enter the name of the role?",
        },
        {
          name: "newRoleSalary",
          type: "input",
          message: "Enter the salary of the role?",
        },
        {
          name: "department",
          type: "list",
          message: "What is the department for the new role?",
          choices: res.map(department => department.name),
        },
      ])
      .then(function (response) {
        let dept = res.find(
          department => department.name === response.department
        )
        db.query("insert into role set ?", {
          title: response.newRole,
          salary: response.newRoleSalary,
          department_id: dept.id,
        })
        console.log("new role added")
        startApp()
      })
  })
}

function addEmployee() {
  db.query("select * from role", (err, res) => {
    inquirer
      .prompt([
        {
          name: "newEmployeeFirstName",
          type: "input",
          message: "Enter the first name of employee?",
        },
        {
          name: "newEmployeeLastName",
          type: "input",
          message: "Enter the last name of employee?",
        },
        {
          name: "NewEmployeeRoleID",
          type: "list",
          message: "What is the role for the new employee?",
          choices: res.map(role => role.title),
        },
      ])
      .then(function (response) {
        let role = res.find(role => role.title === response.NewEmployeeRoleID)
        db.query(
          "insert into employee set ?",
          {
            first_name: response.newEmployeeFirstName,
            last_name: response.newEmployeeLastName,
            role_id: role.id,
            manager_id: 1,
          },
          function (err) {
            if (err) throw err
            console.log("employee added")
            startApp()
          }
        )
      })
  })
}

//updateEmploye()
//prompt employee list
//query employe list
//response grab employees id
//edit response.
startApp()
