const mysql = require("mysql2")

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeeDB",
  },
  console.log(`Connected to the employeeDB database.`)
)

db.connect(function (err) {
  if (err) {
    throw err
  }
})

module.exports = db
