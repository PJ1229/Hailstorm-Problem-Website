import express from 'express';
import cors from 'cors';
import db from './db/connection.js'; // Adjust the path as necessary
import numberRoutes from './routes/number.js'; // Adjust the path as necessary

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use the number routes
app.use('/api', numberRoutes); // This allows you to access your route at /numbers/check/:number

// Example route to check server status
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000; // Define the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
