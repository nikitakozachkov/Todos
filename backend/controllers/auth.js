const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { User } = require("../models/user");
const { schemas } = require("../models/user");
const { httpError, ctrlWrapper, sendEmail } = require("../utils");

const { SECRET_KEY, BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const { error } = schemas.signupSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw httpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.redirect("https://todos-git-main-nikitakozachkov.vercel.app/login")
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemas.verificationSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  if (!email || email === "") {
    throw httpError(400, "Missing required email field");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(404, "Not found");
  }

  if (user.verify) {
    throw httpError(400, "Verification already passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = schemas.loginSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw httpError(401, "Invalid email or password");
  }

  if (!user.verify) {
    throw httpError(401, "Email not verified");
  }

  const passwordComapre = await bcrypt.compare(password, user.password);

  if (!passwordComapre) {
    throw httpError(401, "Invalid email or password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

const current = async (req, res) => {
  const { username } = req.user;

  res.json({ username });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Successfuly logged out",
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
