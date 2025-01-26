const { rentalData } = require("../utils/setupstore");

// Search Handler
const searchProd = (req, res) => {
  const { name } = req.query;
  const results = [];

  if (!name || name.trim().length === 0) {
    return res
      .status(400)
      .send("Bad Request - Query parameter 'name' is required.");
  }

  // Split query into words and search if any of the products contain/start
  // with these words
  const searchTerms = name.toLowerCase().split(" ");

  for (const PID in rentalData) {
    const productName = rentalData[PID].prodName.toLowerCase();

    // Check if any search term is in the product name
    const isMatch = searchTerms.some((term) => productName.includes(term));

    if (isMatch) {
      results.push({ PID, ...rentalData[PID] });
    }
  }

  if (results.length) {
    return res.status(200).json(results);
  } else {
    return res.status(404).send("No match found !!");
  }
};

module.exports = searchProd;
