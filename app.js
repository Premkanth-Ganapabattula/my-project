const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const databasePath = path.join(__dirname, 'myDB.db')

const app = express()

app.use(express.json())

let db = null;

const initializeDbAndServer = async () => {
    try {
      db = await open({
        filename: databasePath,
        driver: sqlite3.Database,
      })
  
      app.listen(8080, () =>
        console.log('Server Running at http://localhost:3000/'),
      )
    } catch (error) {
      console.log(`DB Error: ${error.message}`)
      process.exit(1)
    }
  }