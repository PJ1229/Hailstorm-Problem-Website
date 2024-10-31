import express from 'express';
import cors from 'cors';
import db from './db/connection.js'; // Adjust the path as necessary
import numberRoutes from './routes/number.js'; // Adjust the path as necessary
import path from 'path';

const app = express();

// Middleware
const corsOptions = {
  origin: 'https://hailstorm-problem-website-57886aac9633.herokuapp.com', // replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Use the number routes
app.use('/api', numberRoutes); // Access your route at /api/numbers/check/:number

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  });
}

// Example route to check server status
app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5050; // Define the port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
