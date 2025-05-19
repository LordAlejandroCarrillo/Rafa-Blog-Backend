import { Router } from "express"
import { validateFields } from "../middlewares/validate-fields.js";
import { 
  existsCategoryById,
  existsPublicationById,
  existsSubjectByName
} from "../helpers/db-validator.js";
import { check } from "express-validator";
import { 
  createPublication, 
  deletePublication, 
  getPublicationById, 
  getPublications, 
  updatePublication
} from "./publication.controller.js";

const router = Router()

router.get("/search/:id", check("id").custom(existsPublicationById), getPublicationById)

router.get( "/:subject?/:category?/:offset",getPublications)

router.post(
  "/add-publication/:subject/:category?/",
  [
    validateFields
  ],
  createPublication
)

router.put(
  "/update-publication/:id",
  [
    check("id").custom(existsPublicationById),
    validateFields
  ],
  updatePublication
)

router.delete(
  "/delete-publication/:id",
  [
    check("id").custom(existsPublicationById),
    validateFields,
  ],
  deletePublication
)

export default router
