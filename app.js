const express = require("express");
const app = express();
const PORT = 3000;

// basic welcome
app.get("/", (req, res) => {
  res.send("Welcome to Rental MarketPlace!!");
});

// Add Routes

// serve
app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}...`);
});
