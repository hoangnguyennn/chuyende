const router = require("express").Router();
const controller = require("../controllers/orders.controller");

router.get("/", controller.index);
router.post("/", controller.create);

module.exports = router;
