import mongoose from "mongoose";
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

global.User = global.User || mongoose.model('User',schema);
module.exports = global.User;