const router = require("express").Router();
const controller = require("../controllers/orders.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/", authMiddleware.checkToken, controller.index);
router.post("/", authMiddleware.checkToken, controller.create);

module.exports = router;
