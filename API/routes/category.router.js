import express from 'express';

const router = express.Router();

//to link controller on routes
import * as categoryController from "../controller/category.controller.js"

router.post("/save",categoryController.save);
router.get("/fetch",categoryController.fetch);
// router.delete("/deleteCategory",categoryController.deleteCategory);
// router.patch("/update",categoryController.update);

export default router;