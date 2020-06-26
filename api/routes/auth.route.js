const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.post("/login", controller.login);
router.post("/admin-login", controller.adminLogin);
router.post("/logout", authMiddleware.checkToken, controller.logout);
router.post("/me", authMiddleware.checkToken, controller.me);
router.post("/admin-me", authMiddleware.checkAdmin, controller.me);

module.exports = router;
