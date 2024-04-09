const path = require("path");
const fs = require("fs/promises");
const { Todo } = require("../models/todo");
const { schemas } = require("../models/todo");
const { httpError, ctrlWrapper } = require("../utils");

const todoCoversDir = path.join(__dirname, "../", "public", "todoCovers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Todo.find({ owner });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Todo.findById(id);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  let cover = "";

  if (req.file) {
    const { path: tempUpload, originalname } = req.file;

    const resultUpload = path.join(todoCoversDir, `${owner}_${originalname}`);
    // await fs.rename(tempUpload, resultUpload);
    await fs.writeFileSync(tempUpload, resultUpload);

    cover = path.join("todoCovers", `${owner}_${originalname}`);
  }

  const result = await Todo.create({ ...req.body, cover, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await Todo.findByIdAndRemove(id);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.status(202).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  let cover = "";

  if (req.file) {
    const { path: tempUpload, originalname } = req.file;

    const resultUpload = path.join(todoCoversDir, `${owner}_${originalname}`);
    await fs.rename(tempUpload, resultUpload);

    cover = path.join("todoCovers", `${owner}_${originalname}`);
  }

  const result = await Todo.findByIdAndUpdate(
    id,
    { ...req.body, cover },
    { new: true }
  );

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { error } = schemas.updateStatusSchema.validate(req.body);

  if (error) {
    throw httpError(400, error.message);
  }

  const result = await Todo.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatus: ctrlWrapper(updateStatus),
};
