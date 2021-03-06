const express = require("express");
const router = express.Router();
const { uuid } = require("uuidv4");
const FuzzySearch = require("fuzzy-search");

const Visit = require("../models/visit");

router.get("/:visitId?", (req, res, next) => {
  let visitId = req.query.visitId;
  if (!req.query.visitId) {
    return next();
  }
  Visit.find({ visitId: visitId })
    .exec()
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          userId: result[0].userId,
          name: result[0].name,
          visitId: result[0].visitId,
        });
      } else {
        res
          .status(200)
          .json({ message: `No results found for visit ID ${visitId}` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/:userId?", (req, res, next) => {
  let userId = req.query.userId;
  let searchString = req.query.searchString;

  Visit.find({ userId: userId })
    .exec()
    .then((result) => {
      if (result.length && searchString) {
        const lastFiveLocs = result
          .sort((a, b) => {
            return b.visitDate - a.visitDate;
          })
          .slice(0, 5);

        const searcher = new FuzzySearch(lastFiveLocs, ["name"], {
          caseSensitive: false,
        });

        const sSResult = searcher.search(searchString);
        if (!sSResult.length) {
          return res.json([]);
        }

        return res.status(200).json({
          userId: sSResult[0].userId,
          name: sSResult[0].name,
          visitId: sSResult[0].visitId,
        });
      } else if (result.length && !searchString) {
        res.status(200).json({
          message: `No search string supplied for user ID ${userId}`,
        });
      } else {
        res.status(200).json({
          message: `No entries in the database for user ID ${userId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const visit = new Visit({
    visitId: uuid(),
    visitDate: Date.now(),
    userId: req.body.userId,
    name: req.body.name,
  });
  visit
    .save()
    .then((result) => {
      res.status(200).json({ visitId: result.visitId });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
