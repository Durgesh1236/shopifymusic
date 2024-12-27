import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { addSong, addThumbnail, createAlbum, deleteAlbum, deleteSong, getAllAlbum, getAllSongs, getAllSongsByAlbum, getSingleSong } from "../controllers/songControllers.js";

const router = express.Router();

router.post("/album/new", isAuth, uploadFile, createAlbum);
router.get("/album/all", isAuth, getAllAlbum);
router.post("/new", isAuth, uploadFile, addSong);
router.post("/:id", isAuth, uploadFile, addThumbnail);
router.delete("/:id", isAuth, deleteSong);
router.delete("/delete/:id", isAuth, deleteAlbum);
router.get("/single/:id", isAuth, getSingleSong);
router.get('/all', isAuth, getAllSongs);
router.get("/album/:id", isAuth, getAllSongsByAlbum);
export default router;