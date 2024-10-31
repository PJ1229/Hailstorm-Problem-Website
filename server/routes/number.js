import express from 'express';
import db from '../db/connection.js'; // Ensure the correct path to your connection file

const router = express.Router();

// Route to add a number to the database
router.post("/numbers/add", async (req, res) => {
  try {
    const { number } = req.body;
    const numberToAdd = parseInt(number, 10); // Ensure the number is an integer
    const collection = db.collection("numbers");

    // Add the number to the database
    const result = await collection.insertOne({ number: numberToAdd });
    console.log("Number added successfully");
    res.status(201).send({ success: true, message: "Number added successfully" });
  } catch (err) {
    console.error("Error adding number:", err);
    res.status(500).send({ error: "Error adding number" });
  }
});

export default router;