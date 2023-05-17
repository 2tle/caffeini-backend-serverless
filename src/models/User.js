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
    },
    height: {
        type: Number,
        default: 1
    },
    weight: {
        type: Number,
        default: 1
    },
    age: {
        type: Number,
        default:20
    }
});

global.User = global.User || mongoose.model('User',schema);
export default global.User;