import express from "express";
import {
  addCourse,
  enrollCourse,
  getCourseData,
  getAllCourse,
  addRating,
  addReview,
  checkEnroll,
  deleteCourse,
  askDoubt,
  addChapter,
  updateDescription,
  addPDF,
} from "../controller/course.js";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/add", isAuthenticated, upload.single("image"), addCourse); //tutor will add

router.post("/chapter", isAuthenticated, addChapter);
router.post("/enroll", isAuthenticated, enrollCourse); // user will enroll
router.post("/review", isAuthenticated, addReview);
router.post("/rate", isAuthenticated, addRating);
router.post("/ask-doubt", isAuthenticated, askDoubt);
router.post("/description", isAuthenticated, updateDescription);
router.post("/add-pdf", isAuthenticated, addPDF);

router.get("/getAll", getAllCourse);
router.post("/checkEnroll", checkEnroll);
router.get("/:id", getCourseData); // user will enroll
router.delete("/:id", deleteCourse);

export default router;
