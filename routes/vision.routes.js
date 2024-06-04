import { Router } from "express";
import {
    getDetails
  } from "../controllers/vision.controller.js";

const router = Router();

router
.route("/get-details")
.get(getDetails)

export default router;