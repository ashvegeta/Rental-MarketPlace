const express = require("express");

const searchProd = require("../controllers/search");

const searchRouter = express.Router();

// router for search functionality
searchRouter.get("/", searchProd);

module.exports = searchRouter;
