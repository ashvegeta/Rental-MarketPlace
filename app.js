const express = require("express");
const path = require("path");
const rentalroutes = require("./routes/rental");
const searchroutes = require("./routes/search");
const { checkForExpiredItems } = require("./utils/setupstore");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

// basic welcome
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "static/homePage.html"));
});

// Add Routes
app.use("/rental", rentalroutes);
app.use("/search", searchroutes);

// Background process tp check rental expiry
checkForExpiredItems();
setInterval(checkForExpiredItems, 10000);

// serve
app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}.....`);
});
