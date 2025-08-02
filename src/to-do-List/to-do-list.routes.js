import { Router } from "express";
import { check } from "express-validator";
import { createToDoList, updateToDoList, deleteToDoList, getToDosList } from "./to-do-list.controller.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { validarCampos } from "../middlewares/validate-campos.js";
import { existTaskById } from "../helpers/db-validator.js"; 

const router = Router();

router.post(
    "/create-ToDoList",
    [
        validatejwt,
        validarCampos
    ],
    createToDoList
);

router.put(
    "/update-ToDoList/:taskId",
    [
        validatejwt,
        check("taskId", "Not a valid task ID").isMongoId(),
        check("taskId").custom(existTaskById),
        validarCampos
    ],
    updateToDoList
);

router.delete(
    "/delete-ToDoList/:taskId",
    [
        validatejwt,
        check("taskId", "Not a valid task ID").isMongoId(),
        check("taskId").custom(existTaskById),
        validarCampos
    ],
    deleteToDoList
);

router.get(
    "/get-ToDosList",
    [
        validatejwt,
        validarCampos
    ],
    getToDosList
);

export default router;