import { useState, useEffect } from "react";

const useViewAllTasks = (contract) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        if (!contract || !contract.methods) return;
        try {
            const taskList = await contract.methods.allTask().call();
            setTasks(taskList);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [contract]);

    return { tasks, fetchTasks };
};

export default useViewAllTasks;
