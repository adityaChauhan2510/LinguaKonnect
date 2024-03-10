import express from "express";
import {
  login,
  logout,
  register,
  myCourses,
  getProfile,
} from "../controller/tutor.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/tutorcourses", isAuthenticated, myCourses);
router.get("/:id", getProfile);
export default router;
