const express = require("express");

const todos = require("../../controllers/todos");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, todos.getAll);

router.get("/:id", authenticate, todos.getById);

router.post("/", authenticate, upload.single("cover"), todos.add);

router.delete("/:id", authenticate, todos.deleteById);

router.put("/:id", authenticate, upload.single("cover"), todos.updateById);

router.patch("/:id", authenticate, todos.updateStatus);

module.exports = router;