const {
  createUser,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  login,
  signout,
  logout,
} = require("./user.controller");
const { addUserValidation } = require("../../validation/users/user.validation");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/", checkToken, getUsers);
router.post("/", addUserValidation, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);
router.get("/auth/signout", signout);

module.exports = router;
