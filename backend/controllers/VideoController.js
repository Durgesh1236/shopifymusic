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
        .resize(500, 500) 
        .jpeg({ quality: 80 }) 
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