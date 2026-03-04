import {db} from "../config/db.js"


// export const createRole = (name, callback)=>{
// const sql = "INSERT INTO roles(name) VALUES(?)"
// db.query(sql,[name], callback)
// }

export const getRole = async(name) =>{
    const [rows] = await db.execute(
    "SELECT * FROM roles WHERE name = ?",
    [name]
)
return rows[0]
}