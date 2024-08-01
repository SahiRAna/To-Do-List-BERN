// 0xe227f26c627da20cb7800f20b198634aafae0f5f

const express = require('express')
const cors = require("cors")
const ABI = require('./ABI.json')
const { Web3 } = require('web3')
const dateclashCheck = async (taskDate) => {
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task => task.date === taskDate);

    if (foundTask) {
        return foundTask.name;
    }
    return "No Task Found";
}


const app = express();
app.use(express.json())
app.use(cors())
const web3 = new Web3('https://sepolia.infura.io/v3/8491f9501fbf43b6a11ad48859a3e283');
const contractAddress = '0x0a0fc1c3b7eb4452d63fb914db9c7862291d6b76';
const contract = new web3.eth.Contract(ABI, contractAddress);


app.post("/api/ethereum/create-task", async (req, res) => {
    const { taskDate } = req.body;
    const task = await dateclashCheck(taskDate);
    try {
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash:Task cannot be added" })
        } else {
            res.status(200).json({ status: 200, message: "Task can be added" })
        }
    } catch (error) {
        console.error(error)
    }
})
/*
const viewTask = async () => {
    const task = await contract.methods.viewTask(1).call();
    console.log(task);
}
viewTask();
*/
app.get("/api/ethereum/view-task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await contract.methods.viewTask(taskId).call();
        const { id, name, date } = task;
        const numId = Number(id);
        const taskObj = {
            numId, name, date
        }
        res.status(200).json({ status: 200, taskObj, message: "Task Exist" })
    } catch (error) {
        // console.error(error);
        res.status(404).json({ status: 404, message: "No Task Found" });
        console.error(error);
    }
})
app.get("/api/ethereum/view-all-task", async (req, res) => {
    try {
        const tasks = await contract.methods.allTask().call();
        if (tasks.length < 0) {
            res.status(404).json({ status: 404, message: "Task does not exist" })
        }
        // console.log(tasks);
        else {

            const taskList = tasks.map(({ id, name, date }) => {
                const taskId = Number(id);
                return { taskId, name, date }
            })
            res.status(200).json({ status: 200, taskList, message: "Task Exist" })
        }
    } catch (error) {
        console.error(error);
    }
})/*
app.post("/api/ethereum/update-Task", async (res, req) => {
    const { taskDate } = req.body;
    const task = await dateclashCheck(taskDate);
    try {
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash:Task cannot be Updated" })
        } else {
            res.status(200).json({ status: 200, message: "Task can be Updated" })
        }
    } catch (error) {
        console.error(error)
    }
})
*/app.post("/api/ethereum/update-Task", async (req, res) => {
    const { taskDate } = req.body;
    const task = await dateclashCheck(taskDate);
    try {
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash:Task cannot be updated" })
        } else {
            res.status(200).json({ status: 200, message: "Task can be updated" })
        }
    } catch (error) {
        console.error(error)
    }
})
app.delete("/api/ethereum/delete-task/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const isTrue = await priorityCheck(taskId);
        if (isTrue) {
            res.status(403).json({ status: 403, message: "Task cannot be deleted" })
        } else {
            res.status(200).json({ status: 200, message: "Task can be deleted" })
        }
    } catch (error) {
        console.error(error)
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port${PORT}`);
})
