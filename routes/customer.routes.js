import { Router } from "express";
import {
    createCustomer, createShopTypes, createInterests
  } from "../controllers/customer.controller.js";

const router = Router();

router
  .route("/add")
  .post(
    createCustomer
  );
  router
  .route("/add-shop-type")
  .post(createShopTypes);

  router
  .route("/add-interest")
  .post(createInterests)

export default router;
