const router = require("express").Router({ mergeParams: true });

const ProductAPI = require("./products.route");
const BrandAPI = require("./brands.route");
const OrderAPI = require("./orders.route");
const AuthAPI = require("./auth.route");
const UploadAPI = require("./upload.route");

router.use("/api/products", ProductAPI);
router.use("/api/brands", BrandAPI);
router.use("/api/orders", OrderAPI);
router.use("/api/auth", AuthAPI);
router.use("/api/upload", UploadAPI);

module.exports = router;
