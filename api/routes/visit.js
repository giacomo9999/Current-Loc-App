const express = require("express");
const router = express.Router();

router.get("/:visitId", (req, res, next) => {
  const id = req.params.visitId;
  res.status(200).json({ message: `Handling GET /visit for id: ${id}` });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ message: "Handling POST /visit" });
});

module.exports = router;
