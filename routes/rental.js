const express = require("express");
const {
  listRentalItem,
  rentProduct,
  returnProduct,
  getAllRentalItems,
} = require("../controllers/rental");

const rentalRouter = express.Router();

// Fetch all rental items
rentalRouter.get("/getall", getAllRentalItems);

// Add new item to be rented to the list
rentalRouter.post("/list", listRentalItem);

// Rent a product
rentalRouter.post("/rent", rentProduct);

// Return a rented product
rentalRouter.post("/return", returnProduct);

module.exports = rentalRouter;
