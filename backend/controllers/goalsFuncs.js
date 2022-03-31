const asyncHandler = require("express-async-handler");
const AllGoals = require("../Models/goalsSchema");
const AllUsers = require("../Models/userSchema");

const getGoalsFunc = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    msg: "goal data from a user",
    user: req.meUser,
  });
});
const postGoalsFunc = asyncHandler(async (request, response) => {
  const thisUserId = request.meUser._id;
  const findUser = request.meUser;
  const userWithGoal = await AllGoals.findOne({ user: thisUserId });
  if (request.body.name) {
    if (userWithGoal) {
      if (findUser) {
        if (userWithGoal.user.toString() == thisUserId.toString()) {
          const postUserData = await AllGoals.create({
            name: request.body.name,
            user: thisUserId,
          });
          response.json({
            success: true,
            msg: "Assigned a new goal to a user",
            user: request.meUser,
          });
        } else {
          response.status(400);
          response.json({
            success: false,
            msg: "Not a authorized user to Post",
          });
        }
      } else {
        response.status(400);
        response.json({
          success: false,
          msg: "Not Assigned as a user",
        });
      }
    } else {
      const postPlainData = await AllGoals.create({
        name: request.body.name,
        user: request.meUser,
      });
      response.json({
        success: true,
        msg: "Registered a new user",
        user: request.meUser,
      });
    }
  } else {
    response.status(400);
    throw new Error("No Data to Post");
  }
});
const deleteGoalsFunc = asyncHandler(async (request, response) => {
  const thisUserId = request.meUser.id;
  if (request.params.id) {
    const userWithGoal = await AllGoals.findOne({ user: thisUserId });
    if (request.meUser._id.toString() == userWithGoal.user.toString()) {
      const deleteData = await AllGoals.deleteOne({
        _id: request.params.id,
      });
      response.json({
        success: true,
        msg: "goal is removed by a user",
        user: request.meUser,
        removedData: deleteData,
      });
    } else {
      response.status(400);
      throw new Error("Password not match");
    }
  } else {
    response.status(400);
    throw new Error("No Data to Delete");
  }
});

const putGoalsFunc = asyncHandler(async (request, response) => {
  const thisUserId = request.meUser.id;

  if (request.body.name) {
    const userWithGoal = await AllGoals.findOne({ user: thisUserId });
    if (request.meUser._id.toString() == userWithGoal.user.toString()) {
      const updatedData = await AllGoals.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      response.json({
        success: true,
        msg: "goal is updated with a user",
        user: request.meUser,
      });
    } else {
      response.status(400);
      throw new Error("Password not match");
    }
  } else {
    response.status(400);
    throw new Error("No Data to Update");
  }
});
module.exports = {
  getGoalsFunc,
  deleteGoalsFunc,
  postGoalsFunc,
  putGoalsFunc,
};
