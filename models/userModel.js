const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scaler_id: {
        type: Number
    },
    admin: {
        type: Boolean,
        default: false
    },
    house: {
        type: String
    },
    leetcode_id: {
        type: String
    },
    userType: {
        type: String,
        enum: ['student', 'employee'],
        required: true
    }
}, { timestamps: true });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;