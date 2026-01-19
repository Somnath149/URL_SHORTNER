import { CookieOptions } from "../config/config.js";
import UrlModel from "../model/shorturl.model.js";
import User from "../model/user.model.js";
import { signInToken } from "../utils/signInToken.js";
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { Username, Email, Password } = req.body;
    const existingUser = await User.findOne({ Email });
    const hashedPassword = await bcrypt.hash(Password, 10);

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
        Username,
        Email,
        Password: hashedPassword
    });

    user.req = user;
    const token = await signInToken({ id: user._id, Email: user.Email })
    const cookie = res.cookie("Accesstoken", token, CookieOptions)
    await user.save().then((data) => {
        res.status(201).json({ message: "User registered successfully", data, token })
    }).catch((error) => {
        res.status(500).json({ error: error.message })
    })
}

export const login = async (req, res) => {
    const { Email, Password } = req.body;
    const user = await User.findOne({
        Email
    })
    if (!user) {
        return res.status(404).json({ error: "User not found, please register" })
    }
    const comparePassword = await bcrypt.compare(Password, user.Password);

    if (!comparePassword) {
        return res.status(400).json({ error: "Invalid credentials" })
    }
    user.req = user;
    const token = await signInToken({ id: user._id, Email: user.Email })
    res.cookie("Accesstoken", token, CookieOptions)
    res.status(200).json({ message: "Login successful", user, token })

}

export const logout = async (req, res) => {
    res.clearCookie("Accesstoken");
    res.status(200).json({ message: "Logout successful" })
}

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ user: { Username: user.Username, Email: user.Email, _id: user._id } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUrlByUser = async (req, res) => {
    try{
        const userId = req.user._id;
        const urls = await UrlModel.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ urls });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}