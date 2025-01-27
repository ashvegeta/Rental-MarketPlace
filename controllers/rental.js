const { rentalData, saveData } = require("../utils/setupstore");
const generateUniqueProdId = require("../utils/IDgen");
const { isValidDateFormat, validateDateRange } = require("../utils/dateParse");

// Add new item to be rented to the list
const listRentalItem = (req, res) => {
  const { prodName, desc, pricePerDay, availability } = req.body;
  const newID = generateUniqueProdId();
  const newItem = {
    prodName: prodName,
    desc: desc,
    pricePerDay: pricePerDay,
    availability: availability,
    RentedInfo: null,
  };

  // Update in-memory data and the persistent storage
  rentalData[newID] = newItem;
  saveData();

  // Return result
  return res.send(`a new produce with PID : ${newID} created`);
};

// Fetch all rental items
const getAllRentalItems = (req, res) => {
  const items = Object.keys(rentalData).map((PID) => ({
    PID,
    ...rentalData[PID],
  }));
  return res.json(items);
};

// Rent a product
const rentProduct = (req, res) => {
  const { PID, UID, startDate, endDate } = req.body;

  // Check whether input parameters meet requirements
  if (!UID || !PID) {
    return res.status(400).send("Bad Request - Missing UID or PID!!");
  } else if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    return res
      .status(400)
      .send("Bad Request - Date format should be 'mm-dd-yyyy HH:MM:SS'");
  }

  // Validate date ranges
  const dateValidation = validateDateRange(startDate, endDate);
  if (!dateValidation.valid) {
    return res.status(400).send(`Bad Request - ${dateValidation.message}`);
  }

  // Check product availability
  if (PID in rentalData) {
    const product = rentalData[PID];

    if (product.availability) {
      // Mark the product as rented
      product.availability = false;
      product.RentedInfo = {
        UID,
        startDate,
        endDate,
      };

      saveData();
      return res.status(201).send("Rented successfully.");
    }

    // If the same user is trying to rent the product
    if (product.RentedInfo?.UID === UID) {
      return res.status(409).send("Product already rented by you.");
    }

    // If the product is currently rented by someone else
    return res.status(403).send("Product currently unavailable for rent.");
  }

  // If the product doesn't exist in the rental data
  return res.status(404).send("Requested product unavailable.");
};

// Return a rented product
const returnProduct = (req, res) => {
  const { PID, UID } = req.body;

  if (!UID || !PID) {
    return res.status(400).send("Bad Request - Missing UID or PID!!");
  }

  if (PID in rentalData) {
    const product = rentalData[PID];

    if (!product.availability) {
      if (product.RentedInfo?.UID === UID) {
        product.availability = true;
        product.RentedInfo = null;

        saveData();
        return res.status(200).send("Returned successfully.");
      } else {
        return res
          .status(403)
          .send("You are not the current renter of this product.");
      }
    } else {
      return res.status(400).send("Product is currently not rented.");
    }
  } else {
    return res.status(404).send("Requested product unavailable.");
  }
};

module.exports = {
  listRentalItem,
  getAllRentalItems,
  rentProduct,
  returnProduct,
};
