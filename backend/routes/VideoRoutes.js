import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { addThumbnail, addVideoSong, dislikeVideo, getAllVideos, likeVideo } from "../controllers/VideoController.js";

const router = express.Router();
router.post("/videos", isAuth, uploadFile, addVideoSong);
router.post("/:id", isAuth, uploadFile, addThumbnail);
router.get("/all", isAuth, getAllVideos);

router.post("/:id/like", isAuth, likeVideo);
router.post("/:id/dislike", isAuth, dislikeVideo);
export default router;