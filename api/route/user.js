import express from "express";
import {
  editProfile,
  getMyProfile,
  getProfile,
  login,
  logout,
  register,
  getEnrolledCourses,
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/update", isAuthenticated, editProfile);

router.get("/me", isAuthenticated, getMyProfile);
router.get("/getcourses", isAuthenticated, getEnrolledCourses);
router.get("/:id", getProfile);

export default router;
