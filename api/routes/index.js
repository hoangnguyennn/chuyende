const router = require("express").Router({ mergeParams: true });

const ProductAPI = require("./products.route");
const BrandAPI = require("./brands.route");
const OrderAPI = require("./orders.route");

router.use("/api/products", ProductAPI);
router.use("/api/brands", BrandAPI);
router.use("/api/orders", OrderAPI);

module.exports = router;
