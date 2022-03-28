const express = require("express");
const router = express.Router();
const {authorizeUser} = require("../AllMiddleware/authUser");
const {
  registerUsersFunc,
  putUsersFunc,
  deleteUsersFunc,
  getMeFunc,
  loginUsersFunc,
} = require("../controllers/usersController");

router.post("/" , registerUsersFunc);
router.get("/me" ,authorizeUser, getMeFunc);
router.post('/login', loginUsersFunc);
router.delete("/:id",deleteUsersFunc)
router.put("/:id",putUsersFunc); 

module.exports = router;