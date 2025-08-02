import { Router } from "express";
import { createEvent, getAllEvents as getEventsController, getEventByTitle, updateEvent, deleteEvent } from "./event.controller.js";
import { validatejwt } from "../middlewares/validate-jwt.js";
import { validateUpdateEvent, validateDeleteEvent } from "../middlewares/validate-events.js";

const router = Router();

router.post("/", validatejwt, createEvent);

router.get("/", validatejwt, getEventsController);

router.get("/title/:title", getEventByTitle);

router.put("/:id", validatejwt, validateUpdateEvent, updateEvent);

router.delete("/:id", validatejwt, validateDeleteEvent,deleteEvent);

export default router;

