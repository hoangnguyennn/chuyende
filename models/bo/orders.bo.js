const OrderDAO = require("../dao/orders.dao");
const OrderDetailDAO = require("../dao/orderDetail.dao");
const ProductBO = require("./products.bo");
const nanoid = require("../../utils/nanoid");

module.exports.create = async (order) => {
  order.id = nanoid();
  order.orderDate = order.orderTime = new Date();
  order.status = "Đã đặt hàng";

  try {
    let details = order.details;
    delete order.details;
    // product list promise
    let productsPromise = details.map((detail) =>
      ProductBO.getById(detail.productId)
    );

    // product list
    let products = await Promise.all(productsPromise);

    // get order total
    order.total = products.reduce(
      (total, product, index) => total + product.price * details[index].amount,
      0
    );

    // create order
    await OrderDAO.create(order);

    // order details
    details = details.map((detail, index) => {
      return {
        ...detail,
        id: nanoid(),
        orderId: order.id,
        price: products[index].price
      };
    });

    let detailsPromise = details.map((detail) => OrderDetailDAO.create(detail));

    // create order_details
    await Promise.all(detailsPromise);

    return {
      ...order,
      details
    };
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.getAll = async () => {
  try {
    // get all orders
    let orders = await OrderDAO.getAll();

    // create order_details promise
    let orderDetailsPromise = orders.map((order) =>
      OrderDetailDAO.getByOrderId(order.id)
    );

    // get all order_details
    let orderDetailsList = await Promise.all(orderDetailsPromise);

    // create products promise (2D)
    let productsPromise = orderDetailsList.map((orderDetails) =>
      Promise.all(
        orderDetails.map((detail) => ProductBO.getById(detail.productId))
      )
    );

    // get products
    let products = await Promise.all(productsPromise);

    // merge product to order_details
    orderDetailsList = orderDetailsList.map((orderDetails, index) =>
      orderDetails.map((orderDetail, i) => ({
        ...orderDetail,
        productName: products[index][i].name
      }))
    );

    // merge order_details to orders
    orders = orders.map((order, index) => ({
      ...order,
      details: orderDetailsList[index]
    }));

    return orders;
  } catch (e) {
    throw new Error(e);
  }
};
