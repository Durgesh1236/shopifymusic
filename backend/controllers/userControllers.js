import { User } from "../models/User.js"
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';

export const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
 
    if (!name || !email || !password) {
       return res.json({ success: false, message: 'Missing Details' });
    }
 
    try {
 
       const existUser = await User.findOne({ email });
       if (existUser) {
          return res.json({ success: false, message: 'User already exists' });
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new User({ name, email, password: hashedPassword });
       await user.save();
 
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
       res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000
       });
 
       //Sending welcome email
       const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Welcome to ShopifyMusic',
          text: `Hello ${name}, Welcome to shopifymusic website. Your account has been created with email id: ${email}`
       }
       await transporter.sendMail(mailOptions);
 
       return res.json({
          success: true,
          message: "user create successfully"
       });
 
    } catch (error) {
     return res.json({ success: false, message: error.message })
    } 
 }

export const loginUser = TryCatch(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if (!user)
         return res.status(400).json({
        message: "No User Exists",
    });

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword){
        return res.status(400).json({
       message: "Wrong Password",
   });
} 

    
    generateToken(user._id, res)

    res.status(200).json({
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