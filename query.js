const mysql = require("mysql2");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const connection = mysql.createPool({
  host: MYSQL_ADDRESS,
  database: "biggy_bookings",
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  connectionLimit: 5,
});

module.exports = {
  connection,
};
