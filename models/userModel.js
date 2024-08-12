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
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'user'],
        default: 'user'
    },
    house: {
        type: String,
        default: 'none'
    },
    // userType: {
    //     type: String,
    //     enum: ['student', 'scalerEmployee'],
    //     required: true
    // },
    // house: {
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     role: {
    //         type: String,
    //         enum: ['member', 'core'],
    //         default: 'member'
    //     }
    // },
    
}, { timestamps: true });

const Users = model('Users', userSchema);

export default Users;