import { Router } from "express"
import { validateFields } from "../middlewares/validate-fields.js";
import { existsCommentById, existsPublicationById} from "../helpers/db-validator.js";
import { check } from "express-validator";
import { 
    createComment,
    deleteComment,
    getComments,
    updateComment
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

router.put(
  "/update-comment/:id",
  [
    check("id").custom(existsCommentById),
    validateFields,
  ],
  updateComment
)

router.delete(
  "/delete-comment/:id",
  [
    check("id").custom(existsCommentById),
  ],
  deleteComment
)

export default router
