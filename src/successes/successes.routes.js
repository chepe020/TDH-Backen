import { Router } from "express";
import { 
    createSuccesses, 
    getSuccesses, 
    updateSuccesses, 
    deleteSuccesses 
} from "./successes.controller.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { deleteSuccessesValidator, validateCreateSuccess } from "../middlewares/validar-successes.js";


const router = Router();

router.post(
    "/createSuccesses",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
        validateCreateSuccess
    ],
    createSuccesses
);

router.get(
    "/viewSuccesses",
    [
        validatejwt
    ],
    getSuccesses
);

router.put(
    "/updateSuccesses/:id",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE')
    ],
    updateSuccesses
);

router.delete(
    "/deleteSuccesses/:id",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
        deleteSuccessesValidator,
    ],
    deleteSuccesses
);

export default router;