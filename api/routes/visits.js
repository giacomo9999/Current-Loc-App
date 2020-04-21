const express = require("express");
const router = express.Router();
const { uuid } = require("uuidv4");

const Visit = require("../models/visit");

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  Visit.find({ userId: userId })
    .exec()
    .then((document) => {
      console.log(document);
      res.status(200).json(document);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const visit = new Visit({
    userId: req.body.userId,
    name: req.body.name,
  });
  visit
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(200).json({ message: "Handling POST /visit", visitData: visit });
});

module.exports = router;
