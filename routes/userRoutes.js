const express = require("express");
const router = express.Router();

const { createUser, getUsers, getUserById, updateUser, deleteUser , resetpassword } = require("../contoller/userContoller");

// CRUD routes
router.post("/", createUser);      // Create
router.get("/", getUsers);         // Read All
router.get("/:id", getUserById);   // Read One
router.put("/:id", updateUser);    // Update
router.delete("/:id", deleteUser); // Delete
// router.post("/forgot", resetpassword)


module.exports = router;
