const dbConfig = require("../../configs/dbConfig");
const connection = require("../../helpers/connection");
const query = require("../../helpers/query");

module.exports.create = async (orderDetail) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "insert into order_details set ?";

    return query(conn, sql, [orderDetail]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.getByOrderId = async (orderId) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "select * from order_details where orderId = ?";

    return query(conn, sql, [orderId]);
  } catch (e) {
    throw new Error(e);
  }
};
