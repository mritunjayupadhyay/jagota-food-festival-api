import { Router } from "express";
import {
    getEvents, createEvent
  } from "../controllers/event.controller.js";

const router = Router();

router
.route("/get-event")
.get(getEvents)

router
.route("/add-event")
.post(createEvent)

export default router;