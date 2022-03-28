const asyncHandler = require("express-async-handler");
const AllGoals = require("../Models/goalsSchema");
const AllUsers = require("../Models/userSchema");

const getGoalsFunc = asyncHandler(async (req, res) => {
  const thisId = req.meUser.id;
  const getData = await AllGoals.find({ user: thisId });
  res.status(200).json({
    success: true,
    msg: "goal data from a user",
    getData,
  });
});
const postGoalsFunc = asyncHandler(async (request, response) => {
  const thisUserId = request.meUser.id;
  const findUser = await AllUsers.findOne({ thisUserId });
  const userWithGoal = await AllGoals.findOne({ user: thisUserId });
  if (request.body.name) {
    if (userWithGoal) {
      if (findUser) {
        if (userWithGoal.user == thisUserId) {
          const postUserData = await AllGoals.create({
            name: request.body.name,
            user: thisUserId,
          });
          response.json({
            success: true,
            msg: "Assigned a new goal to a user",
            user: thisUserId,
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
        user: thisUserId,
      });
      response.json({
        success: true,
        msg: "Registered a new user",
        user: thisUserId,
      });
    }
  } else {
    response.status(400);
    throw new Error("No Data to Post");
  }
});
const deleteGoalsFunc = asyncHandler(async (request, response) => {
  const getDataById = await AllGoals.findById(request.params.id);
  const thisUserId = request.meUser.id;
  const findUser = await AllUsers.findOne({ thisUserId });
  const userWithGoal = await AllGoals.findOne({ user: thisUserId });
  if (getDataById) {
    if (userWithGoal) {
      if (findUser) {
        if (userWithGoal.user == thisUserId) {
          const deleteData = await AllGoals.deleteOne({
            _id: request.params.id,
          });
          response.status(200).json(deleteData);
        } else {
          response.status(400);
          response.json({
            success: false,
            msg: "Not a authorized user to delete",
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
      response.json({
        success: true,
        msg: "Not a Registered user",
        user: thisUserId,
      });
    }
  } else {
    response.status(400);
    throw new Error("No Data to Delete");
  }
});

const putGoalsFunc = asyncHandler(async (request, response) => {
  const thisUserId = request.meUser.id;
  const findUser = await AllUsers.findOne({ thisUserId });
  const userWithGoal = await AllGoals.findOne({ user: thisUserId });
  if (request.body.name) {
    if (userWithGoal) {
      if (findUser) {
        if (userWithGoal.user == thisUserId) {
          const updatedData = await AllGoals.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
          );
          response.json({
            success: true,
            msg: "goal is updated with a user",
            user: thisUserId,
          });
        } else {
          response.status(400);
          response.json({
            success: false,
            msg: "Not a authorized user to update",
          });
        }
      } else {
        response.status(400);
        response.json({
          success: false,
          msg: "Not Assigned as a user to update",
        });
      }
    } else {
      response.json({
        success: true,
        msg: "Not a Registered user to update",
        user: thisUserId,
      });
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
