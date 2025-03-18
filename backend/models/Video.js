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
    likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
      likedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      dislikedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
}, {
    timestamps: true,
});

export const Video = mongoose.model("Video", schema);