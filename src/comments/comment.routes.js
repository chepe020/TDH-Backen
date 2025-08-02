import { Router } from "express";
import { check } from "express-validator";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { saveComment, searchComment, getComments, updateComment, deleteComment, getCommentsByPost } from "./comment.controller.js";
import { isCommentOwnerOrAdmin } from "../middlewares/validate-comment.js";
import { validarCampos } from "../middlewares/validate-campos.js";

const router = Router();

router.post(
    "/",
    [
        validatejwt,
        check("publicationId", "The ID of the post is required ").isMongoId(),
        validarCampos
    ],
    saveComment
)

router.get("/", getComments)

router.get(
    "/find/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarCampos
    ],
    searchComment
)

router.put(
    "/:id",
    [
        validatejwt,
        check("id", "Not a valid ID").isMongoId(),
        validarCampos,
        isCommentOwnerOrAdmin
    ],
    updateComment
)


router.delete(
    "/:id",
    [
        validatejwt,
        check("id", "Not a valid ID").isMongoId(),
        validarCampos,
        isCommentOwnerOrAdmin
    ],
    deleteComment
)

router.get("/post/:publicationId", getCommentsByPost);


export default router;