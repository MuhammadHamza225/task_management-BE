import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import { findUserByEmail, createUser } from "../models/userModel.js";
import { getRole } from "../models/roleModel.js";

import jwt from "jsonwebtoken"

dotenv.config();


export const register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;
    console.log(req.body);
    

    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "already exist" });

    // const roleObj = await getRoleByName(role);
    if (!role_id)
      return res.status(400).json({ message: "role id required" });

    const hashed = await bcrypt.hash(password, 10);

    await createUser(name, email, hashed, role_id);

    res.status(201).json({ message: "user created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await findUserByEmail(email);
        if(!user || !(await bcrypt.compare(password, user.password))) 
            return res.status(400).json({message: "invalid creadintials"})
        const token = jwt.sign(
            {id: user.id,
            role_id: user.role_id,},
            process.env.JWT_SECRET,
           { expiresIn: "1d"}

        )
        res.json({token,
          user: {
            id: user.id,
            role: user.role_id === 1 ? "admin" : "user",
            email: user.email,
            name: user.name
          }
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}