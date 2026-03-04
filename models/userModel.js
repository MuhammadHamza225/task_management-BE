import {db} from "../config/db.js"


export const createUser = async (name, email, password, role_id) => {
    
    console.log("Creating user with:", name, email, password, role_id);
    const [result] = await db.execute(
    "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
    [name, email, password, role_id]
  );
  return result;
};

export const findUserByEmail = async (email)=>{
    const [rows] = await db.execute(
     "SELECT * FROM users WHERE email = ?",
    [email]
    );
    return rows[0];
}


export const getUserById = async (id)=>{
    const [rows] = await db.execute(
     "SELECT * FROM users WHERE id = ?",
    [id]
);
return rows[0]
}

export const getAllUsers = async () => {
  const [rows] = await db.execute(
    "SELECT id, name, email, role_id FROM users WHERE role_id != 1"
  );
  return rows;
};