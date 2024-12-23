//importing express module
const express = require('express');

//initialize router
const router = express.Router();

// Middleware to parse incoming json data from request
router.use(express.json());

// Middleware specially for only this route
router.use((req, res, next) => {
    console.log('Auth route middleware is active');
    next();
});

//Registration router
router.post('/users/register', [
    // Validate the fields
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('Your email is required').isEmail().withMessage('Invalid eamil'),
    body('password').not().isEmpty().withMessage('password is required').isLength({min: 6}).withMessage('Password must be atleast 6 characters'),
    ], (req, res) => {
        // Check validation errors
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        // Extract data from request
        const {name, email, password} = req.body;

        // Check if the fields are missing
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Usename, Email and Password are required'});
        }
        res.send('User registration successful');
});

//Login route
router.post('/users/login', (req, res) => {
    res.send('User login successfully');
});

//Logout route
router.post('/users/logout', (req, res) => {
    res.send('User logout successfully');
});

//Profile route (view/ update profile)
router.get('/users/profile', (req, res) => {
    res.send('User profile fatched successfully');
});
router.put('/users/profile', (req,res) => {
    res.send('User successfully updated profile');
});

module.exports = router;