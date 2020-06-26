const dbConfig = require("../../configs/dbConfig");
const connection = require("../../helpers/connection");
const query = require("../../helpers/query");

module.exports.getAll = async () => {
  try {
    const conn = await connection(dbConfig);
    const sql = "select * from brands";

    return query(conn, sql, []);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.getById = async (brandId) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "select * from brands where id = ?";

    return query(conn, sql, [brandId]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.create = async (brand) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "insert into brands set ?";

    return query(conn, sql, [brand]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.update = async (brandId, newBrand) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "update brands set ? where id = ?";

    return query(conn, sql, [newBrand, brandId]);
  } catch (e) {
    throw new Error(e);
  }
};
