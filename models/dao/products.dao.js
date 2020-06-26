const dbConfig = require("../../configs/dbConfig");
const connection = require("../../helpers/connection");
const query = require("../../helpers/query");

module.exports.getAll = async () => {
  try {
    const conn = await connection(dbConfig);
    const sql = "select * from products";

    return query(conn, sql, []);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.getById = async (productId) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "select * from products where id = ?";

    return query(conn, sql, [productId]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.create = async (product) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "insert into products set ?";

    return query(conn, sql, [product]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.update = async (productId, newProduct) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "update products set ? where id = ?";

    return query(conn, sql, [newProduct, productId]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.stopBusiness = async (productId) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "update products set status = 'Stop business' where id = ?";

    return query(conn, sql, [productId]);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.selling = async (productId) => {
  try {
    const conn = await connection(dbConfig);
    const sql = "update products set status = 'Selling' where id = ?";

    return query(conn, sql, [productId]);
  } catch (e) {
    throw new Error(e);
  }
};
