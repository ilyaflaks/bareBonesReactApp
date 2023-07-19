const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
  createDatabase,
  createTable,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const AppError = require("../../utils/appError");
const { eventNames } = require("../../config/database");
const catchAsync = require("../../utils/catchAsync");
module.exports = {
  createUser: catchAsync(async (req, res, next) => {
    const body = req.body;
    console.log("createUser. body: ", body);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const result = await create(body);
    console.log("result: ", result);
    if (!result.affectedRows) {
      throw new Error("Failed! Insert record");
    }

    return res.status(200).json({
      success: 1,
      message: "User created successfully",
    });
  }),

  getUserByUserId: catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await getUserByUserId(id);
    if (!result.length) {
      throw new AppError("Record not found!", 404);
    }
    return res.json({
      success: 1,
      data: result,
    });
  }),

  getUsers: catchAsync(async (req, res, next) => {
    console.log("getUsers in controller");
    const result = await getUsers();
    console.log("result: ", result);
    return res.json({
      success: 1,
      data: result,
    });
  }),
  updateUsers: catchAsync(async (req, res, next) => {
    try {
      const id = req.body.id;
      const body = req.body;
      console.log("id: ", id, ", body: ", body);
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const result = await updateUser(id, body);
      if (!result.affectedRows) {
        throw new Error(`Failed to update record!`);
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    } catch (e) {
      next(e);
    }
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    const id = req.body.id;
    const result = await deleteUser(id);
    if (!result.affectedRows) {
      throw new Error(`Failed to delete record!`);
    }
    return res.json({
      success: 1,
      message: "User deleted successfully",
    });
  }),

  login: catchAsync(async (req, res, next) => {
    console.log("login controller");
    const body = req.body;

    const user = await getUserByUserEmail(body.email);
    //console.log("user: ", user);
    if (!user.length) {
      console.log("Invalid username or password");
      const err = new Error("Invalid username or password");
    }
    const result = compareSync(body.password, user[0].password);
    // console.log("result: ", result);
    if (result) {
      delete user[0].password;
      const jsontoken = sign(
        {
          result: user[0],
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res
        .cookie(`jwtoken`, jsontoken, {
          maxAge: 60 * 60 * 1000,
          secure: true,
          httpOnly: true,
          sameSite: "lax",
        })
        .cookie("authenticated", "true", {
          maxAge: 60 * 60 * 1000,
        })
        .json({
          success: 1,
          message: "Login successful",
          //   token: jsontoken,
        });
    } else {
      throw new Error("Invalid email or password");
    }
  }),

  signout: catchAsync(async (req, res, next) => {
    res
      .clearCookie(`authenticated`)
      .clearCookie(`jwtoken`, {
        secure: true,
        httpOnly: true,
        sameSite: "lax",
      })
      .send("User successfully signed out");
  }),
};
