import { Router } from "express"
import { 
  createSubject, 
  deleteSubject, 
  getSubjectById, 
  getSubjects, 
  updateSubject 
} from "./subject.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existsSubjectById } from "../helpers/db-validator.js";
import { check } from "express-validator";

const router = Router()

router.get("/", getSubjects);

router.get("/search/:id", check("id").custom(existsSubjectById), getSubjectById);

router.post(
  "/add-subject/",
  [
    validateFields
  ],
  createSubject
)

router.put(
  "/update-subject/:id",
  [
    check("id").custom(existsSubjectById),
    validateFields,
  ],
  updateSubject
)

router.delete(
  "/delete-subject/:id",
  [
    check("id").custom(existsSubjectById),
    validateFields,
  ],
  deleteSubject
)

export default router
