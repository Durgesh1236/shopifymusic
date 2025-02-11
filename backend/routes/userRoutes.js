import express from "express";
import {  
     deleteRecentSong,
     isAuthenticated,
     loginUser, logoutUser, 
     myProfile, registerUser, 
     resetPassword, 
     saveToHistory, 
     saveToPlaylist, sendResetOtp, 
     sendVerifyOtp, uploadImage, 
     verifyEmail } from 
     "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.get("/logout", isAuth, logoutUser);
router.post("/song/:id", isAuth, saveToPlaylist);
router.post("/send-verify-otp", isAuth, sendVerifyOtp);
router.post("/verify-account", isAuth, verifyEmail);
router.get("/is-auth", isAuth, isAuthenticated);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);
router.post("/:id",isAuth, uploadFile, uploadImage);
router.post("/save-history/:id", isAuth, saveToHistory);
router.delete("/recent-delete/:id", isAuth, deleteRecentSong);

export default router;