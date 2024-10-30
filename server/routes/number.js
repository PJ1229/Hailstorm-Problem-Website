import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../db/connection.js'; // Ensure the correct path to your connection file

const router = express.Router();

// Route to check if a number exists in the database
router.get("/check/:number", async (req, res) => {
  try {
    const numberToCheck = parseInt(req.params.number, 10); // Make sure this matches the type of data in your database
    const collection = db.collection("numbers");
    const record = await collection.findOne({ number: numberToCheck });

    if (record) {
      res.status(200).send({ exists: true, record });
    } else {
      res.status(200).send({ exists: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error checking number");
  }
});

export default router;