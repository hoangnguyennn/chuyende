const dbConfig = require("../../configs/dbConfig");
const connection = require("../../helpers/connection");
const query = require("../../helpers/query");

module.exports.create = async (order) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "insert into orders set ?";

    return query(conn, sql, [order]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.getAll = async () => {
  try {
    const conn = await connection(dbConfig);
    const sql = "select * from orders";

    return query(conn, sql, []);
  } catch (e) {
    throw new Error(e);
  }
};
