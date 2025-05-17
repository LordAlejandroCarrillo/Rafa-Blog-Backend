import { Router } from "express"
import { validateFields } from "../middlewares/validate-fields.js";
import { existsPublicationById} from "../helpers/db-validator.js";
import { check } from "express-validator";
import { 
    createComment,
    getComments
} from "./comment.controller.js";

const router = Router()

router.get("/:id",check("id").custom(existsPublicationById),getComments)

router.post(
  "/add-comment/:id",
  [
    check("id").custom(existsPublicationById),
    validateFields,
  ],
  createComment
)

// router.get("/search/:id", check("id").custom(existsSubjectById), getSubjectById);

// router.post(
//   "/add-subject/",
//   [
//     validateFields
//   ],
//   createSubject
// )

// router.put(
//   "/update-subject/:id",
//   [
//     check("id").custom(existsSubjectById),
//     validateFields,
//   ],
//   updateSubject
// )

// router.delete(
//   "/delete-subject/:id",
//   [
//     check("id").custom(existsSubjectById),
//     validateFields,
//   ],
//   deleteSubject
// )

export default router
