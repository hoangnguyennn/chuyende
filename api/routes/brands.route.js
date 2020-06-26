const router = require("express").Router();
const controller = require("../controllers/brands.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/", controller.index);
router.post("/", authMiddleware.checkAdmin, controller.create);

router.get("/:brandId", controller.detail);
router.put("/:brandId", authMiddleware.checkAdmin, controller.update);

module.exports = router;
