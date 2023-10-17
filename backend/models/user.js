const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verification token required"],
    },
  },
  { versionKey: false, }
);

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const verificationSchema = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);
const schemas = { signupSchema, loginSchema, verificationSchema };

module.exports = {
  User,
  schemas,
};
