const express = require("express");
const router = express.Router();
const {
  getGoalsFunc,
  putGoalsFunc,
  deleteGoalsFunc,
  postGoalsFunc,
} = require("../controllers/goalsFuncs");
const {authorizeUser} = require("../AllMiddleware/authUser");
router.route("/").get(authorizeUser,getGoalsFunc).post(authorizeUser,postGoalsFunc);
router.route("/:id").delete(authorizeUser,deleteGoalsFunc).put(authorizeUser,putGoalsFunc);

module.exports = router;
