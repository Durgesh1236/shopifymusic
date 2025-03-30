import { User } from "../models/User.js"
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt';
import transporter from '../config/nodemailer.js';
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary"
import mongoose from "mongoose";
import sharp from "sharp"; 
import { RESET_EMAIL_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_MESSAGE } from "./emailTemplates.js";

    export const registerUser = TryCatch(async(req, res) => {
        const { name, email, password } = req.body;
    
       let user = await User.findOne({email});
    
        if(user)
             return res.status(400).json({
            message: "User Already Exists",
        });
    
        const hashPassword = await bcrypt.hash(password, 10)
    
        user = await User.create({
            name,
            email,
            password: hashPassword,
        });
        generateToken(user._id, res);
    
       return res.status(201).json({
            user,
            success: true,
            message: "User Registered",
        });
    });

export const loginUser = TryCatch(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if (!user)
         return res.json({
            success: false,
            message: "No User Exists"
    });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword){
        return res.json({
         success: false,
         message: "Wrong Password"
   });
} 
    generateToken(user._id, res)
    user.isOnline = true;
    await user.save();

    res.status(200).json({
      success: true,
        user,
        message: "User Loggin",
    });
});

export const myProfile = TryCatch(async(req,res) => {
    const user = await User.findById(req.user._id);

    res.json(user);
});

export const logoutUser = TryCatch(async(req,res) => {
    res.cookie("token","", {maxAge: 0});

    const user = await User.findById(req.user._id);
    if (user) {
        user.isOnline = false;
        await user.save();
    }

     res.json({
        message: "Logged Out Successfully",
    });
});

export const saveToPlaylist = TryCatch(async(req,res) =>{
    const user = await User.findById(req.user._id);
    if(user.playlist.includes(req.params.id)){
        const index = user.playlist.indexOf(req.params.id)

        user.playlist.splice(index,1);

        await user.save();

       return res.json({
            message: "Removed from playlist",
        });
    }

    user.playlist.push(req.params.id);
    await user.save();

       return res.json({
            message: "Added to playlist",
        });
});

export const sendVerifyOtp = async (req, res)=>{
    try {
   
       const user = await User.findById(req.user._id);
 
       if(user.isAccountVerified){
          return res.json({
             success: false,
             message: "Account Already Verified"
          })
       }
 
       const otp = String(Math.floor(100000 + Math.random() * 900000));
       user.verifyotp = otp;
       user.verifyotpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
       await user.save();
 
       const mailOption = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: 'Account Verification OTP',
         //  text: `Your OTP is ${otp}. Verify your account using this OTP.`
         html: VERIFICATION_EMAIL_TEMPLATE(otp)
       }
       await transporter.sendMail(mailOption);
 
       return res.json({
          success: true,
          message: 'Verification OTP sent on Email'
       })
 
    } catch (error) {
       return res.json({success: false, message: error.message});
    }
 } 

 export const verifyEmail = async(req, res) => {
    const { otp } = req.body;
    if(!req.user._id || !otp){
       return res.json({
          success: false,
          message: "Missing Details"
       });
    }
 
    try {
       
       const user = await User.findById(req.user._id);
       if(!user){
          return res.json({
             success: false,
             message: "User not found"
          });
       }
       if(user.verifyotp === '' || user.verifyotp !== otp){
          return res.json({
             success: false,
             message: "Invalid OTP"
          });
       }
       if(user.verifyotpExpireAt < Date.now()){
          return res.json({
             success: false,
             message: "OTP Expired"
          });
       }
 
       user.isAccountVerified = true;
       user.verifyotp = '';
       user.verifyotpExpireAt = 0;
 
       await user.save();

       const mailOptions = {
         from: process.env.SENDER_EMAIL,
         to: user.email,
         subject: 'Welcome to ShopifyMusic',
          html: WELCOME_MESSAGE(user.name)
      }
      await transporter.sendMail(mailOptions);

       return res.json({
          success: true,
          message: "Email verified successfully"
       });
    } catch (error) {
       return res.json({success: false, message: error.message});
    }
 }

 export const isAuthenticated = async (req, res) => {
   try {
      return res.json({
         success: true,
         message: "Account Verified Successfully"
      });
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}

export const sendResetOtp = async (req, res) => {
   const { email } = req.body;
   if(!email){
     return res.json({
        success: false,
        message: "Email is required"
     });
   }

   try {
     const user = await User.findOne({email});
     if(!user){
        return res.json({
           success: false,
           message: "User not found"
        });
     }

     const otp = String(Math.floor(100000 + Math.random() * 900000));
     user.resetotp = otp;
     user.resetotpExpireAt = Date.now() + 15 * 60 * 60 * 1000;
     await user.save();

     const mailOption = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: 'Password Reset OTP',
      html: RESET_EMAIL_TEMPLATE(otp)
     }
     await transporter.sendMail(mailOption);

     res.json({
        success: true,
        message: 'OTP sent to your Email'
     });

   } catch (error) {
     return res.json({success: false, message: error.message});
   }
}

export const resetPassword = async (req, res) => {
  const {email, otp, newPassword} = req.body;

  if(!email || !otp || !newPassword){
     return  res.json({
        success: false,
        message: 'Email, OTP and new password are required'
     });
  }
  try {
     const user = await User.findOne({email});
     if(!user){
        return res.json({
           success: false,
           message: 'User not found'
        });
     }
     if(user.resetotp === "" || user.resetotp !== otp){
        return res.json({
           success: false,
           message: 'Invalid OTP'
        });
     }

     if(user.resetotpExpireAt < Date.now()){
        return res.json({
           success: false,
           message: 'OTP Expired'
        });
     }

     const hashedPassword = await bcrypt.hash(newPassword, 10);
     user.password = hashedPassword;
     user.resetotp = '';
     user.resetotpExpireAt = 0; 

     await user.save();
     return res.json({
        success: true,
        message: 'Password has been reset successfully'
     });
  } catch (error) {
     return res.json({
        success: false,
        message: error.message
     });
  }
}

export const uploadImage = TryCatch(async (req, res) => {
   const file = req.file;

   const compressedImage = await sharp(file.buffer)
        .rotate()
       .resize(500, 500) 
       .png({ quality: 60 })
       .jpeg({ quality: 60 }) 
       .toBuffer();

   const fileUrl = getDataurl({ ...file, buffer: compressedImage });

   const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
       quality: "auto", 
   });

   const userId = req.params.id;

   
   if (!mongoose.Types.ObjectId.isValid(userId)) {
       return res.status(400).json({ message: "Invalid user ID" });
   }

   const user = await User.findByIdAndUpdate(
       userId,
       {
           thumbnail: {
               id: cloud.public_id,
               url: cloud.secure_url,
           },
       },
       { new: true }
   );

   if (!user) {
       return res.status(404).json({ message: "User not found" });
   }

   const mailOption = {
       from: process.env.SENDER_EMAIL,
       to: user.email,
       subject: "PROFILE UPDATE",
       text: `Your profile is updated successfully. Please log in with your email id: ${user.email}`,
   };

   await transporter.sendMail(mailOption);

   return res.status(200).json({
       message: "Profile uploaded successfully",
       thumbnail: user.thumbnail,
   });
});

export const saveToHistory = TryCatch(async(req,res) =>{
   const user = await User.findById(req.user._id);
   
   if (user.playhistory.includes(req.params.id)) {
      return res.json({
          message: "Song already in history",
      });
  }

   user.playhistory.push(req.params.id);
   await user.save();

      return res.json({
           message: "Added to History",
       });
});

export const deleteRecentSong = TryCatch(async (req, res) => {
   const user = await User.findById(req.user._id);
   const index = user.playhistory.indexOf(req.params.id)
   user.playhistory.splice(index,1);
       await user.save();

   res.json({
       message: "Recent Song Deleted",
   });
});

export const getTotalUsers = TryCatch(async (req, res) => {
   try {
     const totalUsers = await User.countDocuments();
 
     return res.status(200).json({
       success: true,
       totalUsers,
       message: "Total users count fetched successfully",
     });
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 }); 

 export const getOnlineUsers = TryCatch(async (req, res) => {
   const onlineUsers = await User.find({ isOnline: true }).select('name email');
   const count = onlineUsers.length;

  return res.json({
       success: true,
       count,
       users: onlineUsers
   });
});
