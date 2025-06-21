const express = require("express");
const Car = require("../models/Car"); 
const router = express.Router();


router.get("/rental-cars", async (req, res) => {
  try {
    let query = {}; 
    if (req.query.year) query.year = req.query.year;
    if (req.query.color) query.color = req.query.color;
    if (req.query.steering_type) query.steering_type = req.query.steering_type;
    if (req.query.number_of_seats) query.number_of_seats = req.query.number_of_seats;

    // Search car by name
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, "i") };
    }

    // Fetch cars  and sort by price (low to high)
    const cars = await Car.find(query).sort({ price_per_day: 1 });

    res.json(cars);
  } catch (err) {
    console.error("Error fetching rental cars:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create(add) a new car 
router.post("/add-car", async (req, res) => {
  try {
    const { name, price_per_day, year, color, steering_type, number_of_seats } = req.body;

    const newCar = new Car({ name, price_per_day, year, color, steering_type, number_of_seats });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
