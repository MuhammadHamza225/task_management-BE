import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { getUserById } from "../models/userModel.js"

dotenv.config();

export const protect = async(req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "No token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await getUserById(decoded.id);
        if(!user) return response.status(401).json({message: "user not found"});

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({message: "Invalid token"})
    }
}

// return protect;