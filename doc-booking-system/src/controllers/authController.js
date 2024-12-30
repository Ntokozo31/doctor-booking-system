// Import User model
const User = require('../server/users');

// Import bcrypt
const bcrypt = require('bcrypt');

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

// Import validation
const { validationResult } = require('express-validator');

const getProfile = async (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (!isNaN(parsedId))
        return res.status(400).send('Bad Request');
    const findUsers = User.find(user => user.id === parseInt(req.params.id))
    if (!findUsers)
        return res.status(400).send('Invalide User');
    res.send(findUsers);
}

module.export = getProfile;