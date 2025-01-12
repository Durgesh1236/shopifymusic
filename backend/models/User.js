import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyotp: {
        type: String,
        default: ''
    },
    verifyotpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetotp: {
        type: String,
        default: ''
    },
    resetotpExpireAt: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "user"
    },
    playlist: [
        {
            type: String,
            required: true,
        },
    ],
}, {
    timestamps: true
});

export const User = mongoose.model("User", schema);