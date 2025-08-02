import { Router } from "express";
import { check } from "express-validator";
import { getUsers, updateUser, updateUserPassword, deleteUser, viewUserById } from "./user.controller.js";
import { existUserById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validate-campos.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { validateProperty, validateUserUpdate, validatePasswordChange } from "../middlewares/validator-users.js"; 
const router = Router()

router.get(
    "/viewUsers", 
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
    ],
    getUsers
);

router.get(
    "/viewUserbyId",
    [
        validatejwt
    ],
    viewUserById
);

router.put(
    "/updateUser/:id",
    [
        validatejwt,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existUserById),
        validateUserUpdate,
        validateProperty,
        validarCampos
    ],
    updateUser

)

router.put(
    "/updatePassword/:id",
    [
        validatejwt,
        validateProperty,
        validatePasswordChange,
        validarCampos
    ],
    updateUserPassword
)

router.delete(
    "/deleteUser/:id",
    [
        validatejwt,
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existUserById),
        validarCampos
    ],
    deleteUser
)   

export default router;