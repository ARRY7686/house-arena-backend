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
    userType: {
        type: String,
        enum: ['student', 'scalerEmployee'],
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'user'],
        default: 'user'
    },
    house: {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['member', 'core'],
            default: 'member'
        }
    },
    leetcode_id: {
        type: String
    },
}, { timestamps: true });

const Users = model('Users', userSchema);

export default Users;