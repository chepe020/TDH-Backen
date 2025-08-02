import { Router } from "express";
import { check } from "express-validator";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { savePublication, searchPublication, getPublications, deletePublication, updatePublication } from "./publication.controller.js";
import { isPublicationOwnerOrAdmin } from "../middlewares/validate-publication.js";
import { validarCampos } from "../middlewares/validate-campos.js"

const router = Router();

router.post(
    "/",
    [
        validatejwt,
        check("title", "Title is required").not().isEmpty(),
        validarCampos
    ],
    savePublication
);

router.get(
    "/find/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarCampos
    ],
    searchPublication
);

router.get("/", getPublications)

router.delete(
    "/:id",
    [
        validatejwt,
        check("id", "Not a valid ID").isMongoId(),
        validarCampos,
        isPublicationOwnerOrAdmin
    ],
    deletePublication
);

router.put(
    "/:id",
    [
        validatejwt,
        check("id", "Not a valid ID").isMongoId(),
        validarCampos,
        isPublicationOwnerOrAdmin
    ],
    updatePublication
);

export default router;