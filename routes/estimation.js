const express = require("express");
const router = express.Router();
const { handleEstimation } = require("../controllers/estimationController");

router.post("/", handleEstimation);

module.exports = router;
