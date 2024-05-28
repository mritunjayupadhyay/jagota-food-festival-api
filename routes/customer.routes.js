import { Router } from "express";
import {
    createCustomer, getAllCustomers,  getCustomers, getOneCustomer, getInterests, getShopTypes, createShopTypes, createInterests
  } from "../controllers/customer.controller.js";

const router = Router();

router
  .route("/")
  .get(
    getCustomers
  );

  router
  .route("/all")
  .get(
    getAllCustomers
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

  router
  .route("/:customerId")
  .get(
    getOneCustomer
  );

export default router;
