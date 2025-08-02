import { Router } from "express";
import { 
    createFlashcard, 
    getFlashcard, 
    updateFlashcard, 
    deleteFlashcard 
} from "./flashcard.controller.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { validateDeleteFlashCard } from "../middlewares/validar-flashCard.js";

const router = Router();

router.post(
    "/createFlashcard",
    [
        validatejwt
    ],
    createFlashcard
);

router.get(
    "/viewFlashcard",
    [
        validatejwt
    ],
    getFlashcard
);

router.put(
    "/updateFlashcard/:id",
    [
        validatejwt
    ],
    updateFlashcard
);

router.delete(
    "/deleteFlashcard/:id",
    [
        validatejwt,
        validateDeleteFlashCard
    ],
    deleteFlashcard
);

export default router;