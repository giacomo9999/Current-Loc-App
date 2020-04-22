const express = require("express");
const router = express.Router();
const { uuid } = require("uuidv4");

const Visit = require("../models/visit");

router.get("/:visitId", (req, res, next) => {
  const visitId = req.params.visitId;
  Visit.find({ visitId: visitId })
    .exec()
    .then((result) => {
      console.log(result);
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.status(200).json({ message: `No results found for visit ID ${visitId}` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const visit = new Visit({
    visitId: uuid(),
    userId: req.body.userId,
    name: req.body.name,
  });
  visit
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
