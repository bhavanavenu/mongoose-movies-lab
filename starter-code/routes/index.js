const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities", { celebrities: celebrities });
    })
    .catch(err => {
      console.log("error");
    });
});

module.exports = router;
