import express from 'express';
import db from '../db/connection.js'; // Ensure the correct path to your connection file

const router = express.Router();

// Route to add a number to the database
router.post("/numbers/add", async (req, res) => {
  try {
    // Validate input
    const { number } = req.body;
    if (typeof number !== 'number' || isNaN(number)) {
      return res.status(400).send({ success: false, message: "Invalid number format" });
    }
    
    const numberToAdd = parseInt(number, 10); // Ensure the number is an integer
    const collection = db.collection("numbers");

    // Check if the number already exists in the database
    const existingNumber = await collection.findOne({ number: numberToAdd });
    if (existingNumber) {
      return res.status(400).send({ success: false, message: "Number already exists" });
    }

    // Add the number to the database
    const result = await collection.insertOne({ number: numberToAdd });
    console.log("Number added successfully");
    return res.status(201).send({ success: true, message: "Number added successfully" });
  } catch (err) {
    console.error("Error adding number:", err);
    return res.status(500).send({ success: false, error: "Error adding number" });
  }
});

export default router;