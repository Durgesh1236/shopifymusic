import mongoose from "mongoose";

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    songtype: {
        type: String,
        default: "Videos",
    },
    thumbnail: {
        id: String,
        url: String,
    },
    videos: {
        id: String,
        url: String,
    },
}, {
    timestamps: true,
});

export const Video = mongoose.model("Video", schema);