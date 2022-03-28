const asyncHandler = require("express-async-handler");
const AllUser = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUsersFunc = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body.name);
  if (name && email && password) {
    const postData = await AllUser.findOne({ email });
    if (postData) {
      res.status(400).json({
        success: false,
        msg: `user is already registered`,
        userToken: generateJWtToken(postData._id)
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(password, salt);
      const newUser = await AllUser.create({
        name,
        email,
        password: hashedNewPassword,
      });
      res.status(201).json({
        success: true,
        msg: `new user created ${(email, name)}`,
      });
    }
  } else {
    res.status(400);
    throw new Error("Fill out the required feilds");
  }
});
const getMeFunc = asyncHandler(async (request, response) => {
  const userId = request.meUser.id;
  console.log(userId)
   const {_id, email, password } = await AllUser.findOne({userId});
    response.status(200).json({
      success: true,
      msg: `user data ${email} ${password}`,
      userToken: generateJWtToken(_id)
    })
});
const loginUsersFunc = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  if (email && password) {
    const findData = await AllUser.findOne({ email });
    const userToken = generateJWtToken(findData._id);
    console.log(await bcrypt.compare(password, findData.password))
    if (findData && (await bcrypt.compare(password, findData.password))){
      response.status(200).json({
        success: true,
        msg: `found data ${email}`,
        tooken: userToken,
      });
    }else{
      response.status(400);
    throw new Error("Password Does not match data");
    }
  } else {
    response.status(400);
    throw new Error("Not Found Data");
  }
});
const deleteUsersFunc = asyncHandler(async (request, response) => {
  const getDataById = await AllUser.findById(request.params.id);

  if (!getDataById) {
    response.status(400);
    throw new Error("No Deleted Data");
  } else {
    const deleteData = await AllUser.deleteOne({ _id: request.params.id });
    response.status(200).json(deleteData);
  }
});

const putUsersFunc = asyncHandler(async (request, response) => {
  const getDataById = await AllUser.findById(request.params.id);

  if (!getDataById.id) {
    response.status(400);
    throw new Error("no such a data");
  }

  const updatedData = await AllGoals.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.status(200).json(updatedData);
});
const generateJWtToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : '40d'
  });
}

module.exports = {
  registerUsersFunc,
  getMeFunc,
  deleteUsersFunc,
  loginUsersFunc,
  putUsersFunc,
};
