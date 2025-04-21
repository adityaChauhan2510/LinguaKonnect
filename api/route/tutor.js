import express from "express";
import {
  login,
  logout,
  register,
  myCourses,
  getProfile,
  getMyProfile,
  verifyOTP,
} from "../controller/tutor.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/verify", verifyOTP);
router.post("/login", login);
router.get("/logout", logout);
router.get("/tutorcourses", isAuthenticated, myCourses);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/:id", getProfile);
export default router;
