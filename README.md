# Rental Marketplace App

A basic marketplace platform for renting various products, tools, and more.

## Setup

- `npm install` - Installs the required npm packages used in the application.
- `npm run start` - Starts the server on PORT 3000.

During the development of this project, the following tools were used:

- `npm (Node Package Manager)` - v10.8.3
- `Node.js` - v20.11.0

## Testing

### Testing Through UI (Webpage)

1. Open `localhost:3000` in your browser.
2. Use the search bar to type and get search results in real-time.
3. The home page displays product information and has a `Rent` button next to each item. Click it to enter renter details and date-time.
4. The home page includes two additional buttons:
   - `List New Item`: Click to list a new product.
   - `Return Item`: Click to return an existing rental.

For more details on how REST requests are made, refer to the next section.

### Testing Through Postman

1. **Get All Products**

   - `GET` `localhost:3000/rental/getall`

2. **Search Products**

   - `GET` `localhost:3000/search?name={search_string}`
   - Returns an empty list if no search matches.

3. **List New Product**

   - `POST` `localhost:3000/rental/list`

     ```json
     {
       "prodName": "new product",
       "desc": "a new product",
       "pricePerDay": 7,
       "availability": true
     }
     ```

4. **Rent Product**

   - `POST` `localhost:3000/rental/rent`

     ```json
     {
       "PID": "pid-1737915824178-46421800", // Existing product ID to rent; returns error otherwise
       "UID": "uid-12345", // UID of the person renting the product
       "startDate": "01-26-2025 13:10:00", // Start date (24-hour format) ≥ current date
       "endDate": "02-02-2025 01:01:01" // End date > start date
     }
     ```

   - Returns appropriate HTTP errors if input criteria are not met.

5. **Return Product**

   - `POST` `localhost:3000/rental/return`

     ```json
     {
       "PID": "pid-1737915824178-46421800",
       "UID": "uid-12345"
     }
     ```

   - Returns `200 OK` if the product is currently rented by the same `UID` specified in the request body.

## Implementation

### Project Structure

- **`app.js`**: Entry point for the application.
- **`routes`**: Contains all the routes for REST API calls.
- **`controllers`**: Houses the core logic/handlers for the routes.
- **`models`**: Placeholder for defining important relational entities such as User, Product, etc.
- **`store/rentals.json`**: Persistent storage for products and their rental data.
- **`static`**: Contains webpages/static content like forms, the homepage, images, etc.
- **`utils`**: Stores frequently used functionalities and accessory functions like input parsing and storage setup.

The primary logic of the application is handled in:

- `controllers/rental.js`
- `controllers/search.js`

### Handlers in `controllers/rental.js`

1. **listRentalItem**

   - Adds a new item to the rental list.
   - Generates a unique product ID (PID) using the `generateUniqueProdId` function.
   - Creates a new item with the provided details (`prodName`, `desc`, `pricePerDay`, `availability`) and adds it to in-memory `rentalData`.
   - Saves updated data to persistent storage (`rentals.json`).
   - Returns a success message with the new PID.

2. **getAllRentalItems**

   - Fetches all rental items from the in-memory `rentalData`.
   - Maps the data to include the PID and returns the list of items as a JSON response.

3. **rentProduct**

   - Handles renting a product by validating input parameters (`PID`, `UID`, `startDate`, `endDate`).
   - Checks product availability and date range validity.
   - Marks the product as rented, updates `RentedInfo` with renter details, and saves changes to persistent storage.
   - Returns appropriate success or error messages.

4. **returnProduct**
   - Handles returning a rented product by validating input parameters (`PID`, `UID`).
   - Verifies that the product is currently rented by the same `UID`.
   - Marks the product as available and clears `RentedInfo`.
   - Saves changes to persistent storage and returns success or error messages.

### Handlers in `controllers/search.js`

1. **searchProd**
   - Handles product searches based on the query parameter `name`.
   - Validates input query parameters.
   - Splits the search query into words and matches them with product names.
   - Returns a list of matching products as a JSON response or a `404 Not Found` error if no matches are found.

## Future Scope

Due to the limited timeframe, only basic functionalities were implemented. Possible improvements include:

- **User Authentication**: Implementing user authentication instead of basic UID-based tracking.
- **Database Integration**: Migrating storage to a DBMS like PostgreSQL or a NoSQL database like MongoDB.
- **Enhanced UI/UX**: Improving the overall user experience and design.
- **Data Security and Handling**: Strengthening data consistency and security.
