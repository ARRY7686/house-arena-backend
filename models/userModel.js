import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
}, { timestamps: true });

const Users = model('Users', userSchema);

export default Users;