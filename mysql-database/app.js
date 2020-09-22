const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    port: '3308',
    user: '1802757C',
    password: 'password',
    database: 'Major Proj',
});

con.connect((err) => {
if (err) throw err;
console.log('Connection established');

});

con.end((err) => {

});