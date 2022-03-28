const express = require("express");
const router = express.Router();
const {
  getGoalsFunc,
  putGoalsFunc,
  deleteGoalsFunc,
  postGoalsFunc,
} = require("../controllers/goalsFuncs");

router.route("/").get(getGoalsFunc).post(postGoalsFunc);
router.route("/:id").delete(deleteGoalsFunc).put(putGoalsFunc);

module.exports = router;
