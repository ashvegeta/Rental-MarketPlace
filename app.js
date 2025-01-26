const express = require("express");
const rentalroutes = require("./routes/rental");
const searchroutes = require("./routes/search");
const app = express();
const PORT = 3000;

// basic welcome
app.get("/", (req, res) => {
  res.send("Welcome to Rental MarketPlace!!");
});

// Add Routes
app.use(express.json());
app.use("/rental", rentalroutes);
app.use("/search", searchroutes);

// serve
app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}.....`);
});
