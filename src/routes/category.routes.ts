import { Router } from "express";
import {
  deleteCategory,
  getCategories,
  postCategory,
  putCategory,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.post("/", postCategory);
router.put("/:id", putCategory);
router.delete("/:id", deleteCategory);

export default router;
