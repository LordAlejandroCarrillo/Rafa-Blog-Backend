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

export default router
