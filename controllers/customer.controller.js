import { Customer, ShopType, Interest } from "../models/Customer.model.js";
import { asyncHandler } from "../utils/async.utils.js";
import { ApiResponse } from "../utils/response.utils.js";

const createCustomer = asyncHandler(async (req, res) => {
  const {
    salesPerson,
    interested_in,
    contactPersonName,
    companyName,
    shop_type,
    mobile,
    email,
    line,
    province,
    district,
    event,
    image,
    audio,
    attachments,
    customerType,
    country = "Thailand"
  } = req.body;

  console.log("body", country, req.body);

  // Check if name is valid
  if (!contactPersonName || contactPersonName.trim() === "") {
    return res.status(400).json(new ApiResponse(400, null, "Invalid name"));
  }
  // Create username: remove spaces, convert to lowercase, replace spaces with underscore
  const trimmedName = (contactPersonName || "").trim().toLowerCase().replace(/ /g, "_");
  const trimmedCompanyName = (companyName || "").trim().toLowerCase().replace(/ /g, "_");
  const trimmedMobile = (mobile || "").trim().toLowerCase().replace(/ /g, "_");
  const username = `${trimmedName}_${trimmedCompanyName}_${trimmedMobile}`;
  const existedCustomer = await Customer.findOne({
    username,
  });

  if (existedCustomer) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, { existedCustomer }, "username already exists")
      );
  }
  const customer = await Customer.create({
    username,
    salesPerson,
    interested_in,
    contactPersonName,
    companyName,
    shop_type,
    mobile,
    email,
    line,
    province,
    district,
    event,
    image,
    audio,
    attachments,
    customerType,
    country
  });

  await customer.save();

  const createdCustomer = await Customer.findById(customer._id);

  if (!createdCustomer) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Something went wrong while creating the customer"
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { customer: createdCustomer },
        "Customer is created."
      )
    );
});

const getOneCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const customer = await Customer.findById(customerId);

  return res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer are retrieved."));
});

const getCustomers = asyncHandler(async (req, res) => {
  const { salesPerson } = req.query;
  const customers = await Customer.find({ salesPerson }).select({ contactPersonName: 1, _id: 1, companyName: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, customers, "Customers are retrieved."));
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find().select({ contactPersonName: 1, _id: 1, companyName: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, customers, "Customers are retrieved."));
});

const createShopTypes = asyncHandler(async (req, res) => {
  const {
    names,
  } = req.body;

  const filteredNames = names.filter((name) => name.trim() !== "");
  const shopTypes = await Promise.all(filteredNames.map(async (name) => {

    const existedShopType = await ShopType.findOne({
      name,
    });
    return existedShopType === null ? { name } : null;
  }));
  const filteredShopTypes = shopTypes.filter((shopType) => shopType !== null);

  const createdShopTypes = await ShopType.insertMany(filteredShopTypes);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { shopTypes: createdShopTypes },
        "ShopTypes are created."
      )
    );
});

const createInterests = asyncHandler(async (req, res) => {
  const {
    names,
  } = req.body;

  const filteredNames = names.filter((name) => name.trim() !== "");
  const interests = await Promise.all(filteredNames.map(async (name) => {

    const existedInterest = await Interest.findOne({
      name,
    });
    return existedInterest === null ? { name } : null;
  }));
  const filteredInterests = interests.filter((interest) => interest !== null);

  const createdInterests = await Interest.insertMany(filteredInterests);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { interests: createdInterests },
        "Interest are created."
      )
    );
});

const getInterests = asyncHandler(async (req, res) => {
  const interests = await Interest.find();

  return res
    .status(200)
    .json(new ApiResponse(200, { interests }, "Interests are retrieved."));
});

const getShopTypes = asyncHandler(async (req, res) => {
  const shopTypes = await ShopType.find();

  return res
    .status(200)
    .json(new ApiResponse(200, { shopTypes }, "ShopTypes are retrieved."));
});



export { createCustomer, getAllCustomers, getCustomers, getOneCustomer, getInterests, getShopTypes, createShopTypes, createInterests };
