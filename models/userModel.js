const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    scaler_id: {
        type: Number,
        required: false
    },
    house: {
        type: String,
        required: true
    },
    leetcode_id: {
        type: String,
        required: false
    },
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;