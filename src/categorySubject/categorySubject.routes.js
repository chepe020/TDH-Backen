import { Router } from "express";
import { 
    requestCreateCategorySubject, 
    viewnRequestCategorySubjectPending, 
    updateRequestCategorySubject, 
    /*createCategorySubject,*/ 
    getCategorySubject, 
    assignCategorySubject,
    getCategorySubjectByUser 
} from "./categorySubject.controller.js";
import { validateCreateCategorySubject, validateUserAlreadyAssigned } from "../middlewares/validar-cateogySubject.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/requestCreateSubject",
    [
        validatejwt,
        validateCreateCategorySubject,
    ],
    requestCreateCategorySubject
);

router.get(
    "/viewRequestSubject",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
    ],
    viewnRequestCategorySubjectPending
);

router.put(
    "/updateRequestSubject/:id",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
    ],
    updateRequestCategorySubject
);

router.get("/viewSubject",getCategorySubject);

router.post(
    "/assignMeSubject/:id",
    [
        validatejwt,
        validateUserAlreadyAssigned
    ],
    assignCategorySubject
);

router.get(
    "/viewUserSubject",
    [
        validatejwt
    ],
    getCategorySubjectByUser
);

export default router;