import mongoose from "mongoose";
const schema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String, /* yyyyMMdd */
        required: true
    },
    name: {
        type: String,
        required: true
    },
    caffeine: {
        type: Number,
        required: true
    }
});