const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5131988',
  database: 'e-commerce'
});


module.exports=db