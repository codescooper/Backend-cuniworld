const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lapins",
  password: "solidarite225",
  port: 5432,
});

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connection to database successful:', res.rows[0]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

testConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
