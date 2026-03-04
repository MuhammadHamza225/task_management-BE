import { getAllUsers } from "../models/userModel.js";

// export const fetchUsers = async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getAllUsersBy = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};