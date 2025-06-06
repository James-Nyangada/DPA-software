const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require("./config/dbConnect")
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors');


dbConnect();

const app = express();

// ✅ Enable CORS (allow requests from frontend origin)
app.use(cors({
  origin: 'http://localhost:3000', // change to actual domain in prod
  credentials: true // if you need cookies/auth headers
}));

//middleware
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Add this before your routes to debug
app.use((req, res, next) => {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Raw body:', req.body);
    
    // If it's text but should be JSON, try parsing it
    if (req.headers['content-type'] === 'text/plain' && typeof req.body === 'string') {
        try {
            req.body = JSON.parse(req.body);
            console.log('Parsed body:', req.body);
        } catch (e) {
            console.log('Failed to parse as JSON:', e.message);
        }
    }
    next();
});

//routes
app.use("/api/auth", authRoutes);
app.use ("/api/users", userRoutes);

// root test route
app.get('/', (req, res) => {
  res.send('API is running');
});


//start server

const PORT = process.env.PORT || 4001;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})