//Import the app from app.js
const express = require('./app');

//Define the port for the server
const PORT = process.env.PORT || 5000;

//Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});