// Import express
const express = require('express');

// Initialize the app
const app = express();

// Port setup
const PORT = process.env.PORT || 3000;

// Port listener
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`)
})