import { Router } from "express"
import { validateFields } from "../middlewares/validate-fields.js";
import { existsCategoryById, existsPublicationById} from "../helpers/db-validator.js";
import { check } from "express-validator";
import { createCategory, getCategories, getCategoryById } from "./category.controller.js";

const router = Router()

router.get("/search/:id",check("id").custom(existsCategoryById),getCategoryById)

router.get("/",getCategories)

router.post(
  "/add-category/",
  [
    validateFields,
  ],
  createCategory
)
export default router
