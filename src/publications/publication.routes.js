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
  getPublicationsCategory, 
  getPublicationsCategoryAndSubject, 
  getPublicationsSubject, 
  updatePublication
} from "./publication.controller.js";

const router = Router()

router.get("/get-bySubject/:subject", check("subject").custom(existsSubjectByName),getPublicationsSubject)

router.get("/get-byCategory/:category", check("category").custom(existsSubjectByName),getPublicationsCategory)

router.get(
  "/get-bySubjectAndCategory/:subject/:category",
  [ 
    check("subject").custom(existsSubjectByName),
    check("category").custom(existsSubjectByName)
  ],
  getPublicationsCategoryAndSubject
)

router.get("/",getPublications)

router.get("/search/:id", check("id").custom(existsPublicationById), getPublicationById)

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
