const express = require("express");
const router = express.Router();
const {
  createPosition,
  getUserPositions,
  deletePosition,
  updatePosition,
} = require("../controllers/positionController");

router.post("/", createPosition);

router.get("/", getUserPositions);

router.delete("/:id", deletePosition);

router.put("/:id", updatePosition);

module.exports = router;
