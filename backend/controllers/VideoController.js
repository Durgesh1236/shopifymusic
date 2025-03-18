import { Video } from "../models/Video.js";
import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary"
import sharp from "sharp"; 

export const addVideoSong = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not admin",
        });
    }

    const { description } = req.body;
    const file = req.file;
    const fileUrl = getDataurl(file);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
        resource_type: "video",
    });

    await Video.create({
        description,
        videos: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
    });

    res.json({
        message: "Video Added",
    });
});

export const addThumbnail = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not admin",
        });
    }

    const file = req.file;

    const compressedImage = await sharp(file.buffer)
        .resize(700, 700) 
        .jpeg({ quality: 80 }) 
        .png({ quality: 80 })
        .toBuffer();

    const fileUrl = getDataurl({ ...file, buffer: compressedImage });
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
        quality: "auto", 
    });

    await Video.findByIdAndUpdate(
        req.params.id,
        {
            thumbnail: {
                id: cloud.public_id,
                url: cloud.secure_url,
            },
        },
        { new: true }
    );
    res.json({
        message: "Thumbnail Added",
    });
});

export const getAllVideos = TryCatch(async (req, res) => {
    const videos = await Video.find();

    res.json(videos);
});

export const likeVideo = TryCatch(async (req, res) => {
    const videoId = req.params.id;
    const userId = req.user._id;

    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(404).json({
            message: "Video not found",
        });
    }

    // Check if user already liked it
    const likedIndex = video.likedBy.indexOf(userId);
    const dislikedIndex = video.dislikedBy.indexOf(userId);

    if (likedIndex !== -1) {
        // User already liked it => Remove like (toggle)
        video.likedBy.splice(likedIndex, 1);
        video.likes -= 1;
        await video.save();
        return res.json({
            message: "Like removed",
            likes: video.likes,
        });
    }

    // // If user disliked it before, remove dislike
    // if (dislikedIndex !== -1) {
    //     video.dislikedBy.splice(dislikedIndex, 1);
    //     video.dislikes -= 1;
    // }

    // Add like
    video.likedBy.push(userId);
    video.likes += 1;

    await video.save();

    res.json({
        message: "Video liked",
        likes: video.likes,
        dislikes: video.dislikes,
    });
});

export const dislikeVideo = TryCatch(async (req, res) => {
    const videoId = req.params.id;
    const userId = req.user._id;

    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(404).json({
            message: "Video not found",
        });
    }

    // Check if user already disliked it
    const dislikedIndex = video.dislikedBy.indexOf(userId);
    const likedIndex = video.likedBy.indexOf(userId);

    if (dislikedIndex !== -1) {
        // User already disliked it => Remove dislike (toggle)
        video.dislikedBy.splice(dislikedIndex, 1);
        video.dislikes -= 1;
        await video.save();
        return res.json({
            message: "Dislike removed",
            dislikes: video.dislikes,
        });
    }

    // If user liked it before, remove like
    if (likedIndex !== -1) {
        video.likedBy.splice(likedIndex, 1);
        video.likes -= 1;
    }

    // Add dislike
    video.dislikedBy.push(userId);
    video.dislikes += 1;

    await video.save();

    res.json({
        message: "Video disliked",
        likes: video.likes,
        dislikes: video.dislikes,
    });
});

// export const getSingleSong = TryCatch(async(req,res)=> {
//     const like = await Video.findById(req.params.id);
//     res.json();
// });
  
  