const express = require("express")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3001
const app = express()

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory_db",
  },
  console.log(`Connected to the inventory_db database.`)
)
