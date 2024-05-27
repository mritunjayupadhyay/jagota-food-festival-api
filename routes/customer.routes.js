import { Router } from "express";
import {
    createCustomer, getCustomers, getOneCustomer, getInterests, getShopTypes, createShopTypes, createInterests
  } from "../controllers/customer.controller.js";

const router = Router();

router
  .route("/")
  .get(
    getCustomers
  );

  router
  .route("/:customerId")
  .get(
    getOneCustomer
  );

router
  .route("/add")
  .post(
    createCustomer
  );

  router
  .route("/get-shop-type")
  .get(getShopTypes);

  router
  .route("/add-shop-type")
  .post(createShopTypes);



  router
  .route("/get-interest")
  .get(getInterests)

  router
  .route("/add-interest")
  .post(createInterests)

export default router;
