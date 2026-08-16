const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User with this email already exists !",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Registered Successfully.",
    user,
    token,
  });
});

authRouter.get("/users", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "Users fetched successfully !",
    users,
  });
});

authRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await userModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "User deleted successfully !",
  });
});

module.exports = authRouter;
