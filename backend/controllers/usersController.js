const User = require('../models/User');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean();

    // If no users 
    if (!users?.length) {
        return res.status(400).json({message: 'No users found'});
    }
    res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const {username, password, email, roles} = req.body;

    // Check for duplicate username
    const duplicate = await User.findOne({username}).collation({locale: 'en', strength: 2}).lean().exec();

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate username!'});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = {username, "password": hashedPwd, email, roles};

    // Create and store new user
    const user = await User.create(userObject);

    if (user) { //created
        res.status(201).json({message: `New user ${username} created`});
    } else {
        res.status(400).json({message: 'Invalid user data received'});
    }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
    const {id, username, password, email, roles, active} = req.body;

    // Confirm user exists to update
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    // Check for duplicate username
    const duplicate = await User.findOne({username}).collation({locale: 'en', strength: 2}).lean().exec();

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate username'});
    }

    user.username = username;
    user.email = email;
    user.roles = roles;
    user.active = active;

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({message: `${updatedUser.username} updated`});
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const {id} = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({message: 'User ID Required'});
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};