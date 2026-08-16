const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User with this email already exists !",
    });
  }

  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
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

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "This is protected route",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(404).json({
      message: "Invalid email or password !",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "You are successfully logged in",
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
