Car Rental API
 
A REST API for managing car rentals, built with Node.js, Express.js, and MongoDB. Users can
register, log in, view their profile, and browse rental cars with filters.

                      Quick Start

1. **Clone the repository:** 
            git clone https://github.com/gentsadiku21/Car-Rental.git


2. **Install dependencies:** 
             npm install


3. **Configure environment variables**


4. **Start the server:**
           npm start
       
       
       ### Project Overview

1. Authentication: Users can register/login with JWT for secure access.
2. Profile Management: View details of the currently logged-in user.
3. Car Listings: Filter rental cars by year, color, steering type, or seats. Results are sorted by price.

                                  Setup Guide
### Requirements:
- Node.js (v14+)
- MongoDB (local or cloud instance)
- API testing tool like Postman

### Configuration
Create a .env file in the project root with the following variables:
JWT_SECRET=your-secret-key
MONGO_URI=mongodb://localhost:27017/carRental
PORT=5000
Replace your-secret-key with a strong password for JWT encryption.
Adjust MONGO_URI if your MongoDB instance is hosted elsewhere.
Features
| **User Registration**-Create an account with full name, email, username, and password.
| **Login**-Authenticate users and issue a JWT token for access. 
| **Profile View**-Fetch details of the currently logged-in user (Full name, username, email). 
| **Car Filters**-Filter available cars by year, color, steering type, and number of seats. Cars are sorted by price.
                              **Running the API**

                         After setting up the project:

1. The server will run on http://localhost:5000 by default (or the port specified in .env).
2. Use API tools like **Postman** to test the following endpoints:

API Endpoints
#### 1. User Registration
- **Method:** POST
- **URL:** /api/auth/register
- **Request Body:**
 ```json
 {
 "fullName": "Test",
 "email": "Test@example.com",
 "username": "Test",
 "password": "password123"
 }
 ```
- **Response:**
 - Success: 201 - User registered successfully.
 - Error: 400 - Username already taken.


#### 2. User Login
- **Method:** POST
- **URL:** /api/auth/login
- **Request Body:**
 ```json
 {
 "username": "Test",
 "password": "password123"
 }
 ```
- **Response:**
 - Success: `{ "token": "jwt-token-here" }`
 - Error: 400 - Invalid credentials.



#### 3. View Profile (Authenticated)
- **Method:** GET
- **URL:** /api/auth/my-profile
- **Authorization:** Bearer token (JWT token in the Authorization header)
- **Response:**
 ```json
 {
 "fullName": "Test ",
 "username": "Test",
 "email": "Test@example.com"
 }
 ```

 
#### 4. View Rental Cars
- **Method:** GET
- **URL:** /api/cars/rental-cars
- **Query Parameters:**
 - `year`: Filter by car year (optional).
 - `color`: Filter by car color (optional).
 - `steering_type`: Filter by steering type (optional).
 - `number_of_seats`: Filter by number of seats (optional).
- **Response:** Returns a list of cars sorted by price (from lowest to highest).

 Example:
 ```json
 [
 {
 "_id": "60e84e45772d9c247d179ea7",
 "name": "Golf mk8",
 "price_per_day": 50.0,
 "year": 2015,
 "color": "black",
 "steering_type": "automatic",
 "number_of_seats": 5
 },
 {
 "_id": "60e84e45772d9c247d179ea8",
 "name": "BMW 320",
 "price_per_day": 70.0,
 "year": 2018,
 "color": "white",
 "steering_type": "manual",
 "number_of_seats": 4
 }
 ]
