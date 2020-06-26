const OrderBO = require("../../models/bo/orders.bo");
const logger = require("../../utils/logger");
const { flatten } = require("../../utils/formatter");

module.exports.bestSeller = async (req, res) => {
  let { limit } = req.query;
  const now = new Date();

  if (!limit || isNaN(+limit) || limit > 5 || limit <= 0) {
    limit = 5;
  }

  try {
    // get all orders
    let orders = await OrderBO.getAll();

    // filter by order time (month)
    orders = orders
      .filter((order) => {
        let date = new Date(order.orderDate);
        return date.getMonth() === now.getMonth();
      })
      .map((order) => order.details);

    // flatten orders
    orders = flatten(orders);

    let output = [];
    orders
      .map((order) => ({
        productId: order.productId,
        productName: order.productName,
        amount: order.amount
      }))
      .map((order) => {
        let pos = output.map((item) => item.productId).indexOf(order.productId);

        if (pos === -1) {
          output.push(order);
        } else {
          output[pos].amount += order.amount;
        }
      });

    return res.status(200).json({
      data: output.slice(0, limit),
      status: true
    });
  } catch (e) {
    logger.error(e);
    return res.status(401).json({
      message: "Have error",
      status: false
    });
  }
};
