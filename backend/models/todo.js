const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../utils");

const todoSchema = new Schema(
  {
    cover: String,
    title: {
      type: String,
      required: [true, "Need title for todo"],
    },
    description: String,
    category: { type: String, required: [true, "Category required for todo"] },
    deadline: String,
    isDone: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

todoSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  cover: Joi.string().allow(null, ""),
  title: Joi.string().required(),
  description: Joi.string().allow(null, ""),
  category: Joi.string().required(),
  deadline: Joi.string().allow(null, ""),
});

const updateStatusSchema = Joi.object({
  isDone: Joi.boolean().required(),
});

const Todo = model("todo", todoSchema);
const schemas = { addSchema, updateStatusSchema };

module.exports = { Todo, schemas };
