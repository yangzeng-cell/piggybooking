const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "10.35.112.189:3306",
  database: "biggy_booking",
  user: "yangzeng123",
  password: "441422Yz123",
  connectionLimit: 5,
});

module.exports = {
  connection,
};
