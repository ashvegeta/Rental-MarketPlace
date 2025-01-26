const express = require("express");
const {
  listRentalItem,
  rentProduct,
  returnProduct,
} = require("../controllers/rental");

const rentalRouter = express.Router();

// Add new item to be rented to the list
rentalRouter.get("/list", listRentalItem);

// Rent a product
rentalRouter.get("/rent", rentProduct);

// Return a rented product
rentalRouter.get("/return", returnProduct);

module.exports = rentalRouter;
