/*
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

async function getConnection() {
    try{
        const connection = await pool.getConnection()
        return connection;
    }catch(error){
        console.log(error)
    }
}

module.exports = {getConnection};
*/