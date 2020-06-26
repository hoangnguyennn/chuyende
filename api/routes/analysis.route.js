const router = require("express").Router();
const controller = require("../controllers/analysis.controller");

router.get("/best-seller", controller.bestSeller);

module.exports = router;
