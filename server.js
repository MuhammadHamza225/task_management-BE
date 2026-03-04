import dotenv from "dotenv"
dotenv.config()
import app from "./app.js";

// console.log("server start");
import { db } from "./config/db.js";

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`App listen on ${PORT}`);
    
})