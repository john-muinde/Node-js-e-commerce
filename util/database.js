const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost'
})