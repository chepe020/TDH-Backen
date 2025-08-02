import { Router } from "express";
import { 
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct, 
    shoppingCartUser, 
    confirmPurchase 
} from "./productShoppingCartAndPucharse.controller.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { validateDeleteProduct } from "../middlewares/validar-pucharseWithPoints.js";

const router = Router();

router.post(
    "/createProduct",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
    ],
    createProduct
);

router.get(
    "/viewProduct",
    getProduct
);

router.put(
    "/updateProduct/:id",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
    ],
    updateProduct
);

router.delete(
    "/deleteProduct/:id",
    [
        validatejwt,
        tieneRole('ADMIN_ROLE'),
        validateDeleteProduct
    ],
    deleteProduct
);

router.post(
    "/shoppingCartUser/:id",
    [
        validatejwt
    ],
    shoppingCartUser
);

router.post(
    "/confirmPurchase",
    [
        validatejwt
    ],
    confirmPurchase
);

export default router;