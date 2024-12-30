// Import User model
const User = require('../models/User');

// Import bcrypt
const bcrypt = require('bcrypt');

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Import validation
const { validationResult } = require('express-validator');