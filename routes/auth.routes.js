import { Router } from "express";
import { loginSalesPerson } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").get((req, res) => res.send("Hello World!"));
router.route("/login").post(loginSalesPerson);

export default router;