// create necessary folders and sub-folders for in-memory storage (JSON)
const fs = require("fs");
const path = require("path");

const storeDir = path.join(__dirname, "../store");
const rentalsFile = path.join(storeDir, "rentals.json");
let rentalData = {};

// Create directory if it doesn't exist
if (!fs.existsSync(storeDir)) {
  fs.mkdirSync(storeDir);
}

// Create file if it doesn't exist
if (!fs.existsSync(rentalsFile)) {
  fs.writeFileSync(rentalsFile, JSON.stringify(rentalData));
}

// Load data from the JSON file at startup
try {
  const fileContent = fs.readFileSync(rentalsFile, "utf8");
  rentalData = JSON.parse(fileContent); // Load rentals into memory
} catch (error) {
  console.error("Error loading rental data:", error.message);
}

// Save data back to the file
function saveData() {
  console.log(rentalsFile);
  fs.writeFile(rentalsFile, JSON.stringify(rentalData, null, 2), (err) => {
    if (err) {
      console.error("Error saving rental data:", err.message);
    }
  });
}

console.log("storage setup is done .....");

module.exports = { rentalData, saveData };
