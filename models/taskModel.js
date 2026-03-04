import { db } from "../config/db.js";


export const createTask = async(req, res)=>{
    console.log("==== CHECK ====");
  console.log(req.user);
  console.log("===============");
    
try {
    if(req.user.role_id !== 1){
        return res.status(403).json({message: "only admin can add task"})
    }
    
    const {title, description, assigned_to} = req.body;
 const [assignedUser] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [assigned_to]
    );

    if (!assignedUser.length) {
      return res.status(400).json({ message: "Assigned user does not exist" });
    }

    const [result] = await db.execute(
        "INSERT INTO tasks (title, description, assigned_to, created_at) VALUES (?,?,?,?)",
        [title,description, assigned_to, new Date()]
    )
    res.status(201).json({message: "Task assigned"})
} catch (err) {
    res.status(500).json({message: err.message})
}
}

export const getTask = async(req, res) => {
    try {
        let query = "SELECT * FROM tasks";
        let params = [];

        if (req.user.role_id !== 1) {
            // agar user normal user hai, sirf unke tasks
            query += " WHERE assigned_to = ?";
            params.push(req.user.id);
        }

        const [tasks] = await db.execute(query, params);
        res.json(tasks);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateTask = async(req, res) =>{
    try {
        const {status} = req.body;
        const taskId = req.params.id;

const [rows] = await db.execute(
    "SELECT * FROM tasks WHERE id = ? AND assigned_to = ?",
    [taskId, req.user.id]
);
if(!rows.length)
    return res.status(403).json({message: "Not allowed"})
await db.execute(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, taskId]
);
res.json({message: "task updated"})
    } catch (err) {
      res.status(500).json({message: err.message})  
    }
}