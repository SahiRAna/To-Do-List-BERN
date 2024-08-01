import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useViewAllTasks from './useViewAllTasks'
import Navigation from "./Navigation";
const ViewAllTasks = ({ state }) => {
    const { tasks, setTasks, fetchTasks } = useViewAllTasks(state.contract);
    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        const allTasks = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/ethereum/view-all-Task", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                })
                const data = await res.json();
                if (data.status === 200) {
                    console.log(data.taskList)
                    setTaskList(data.taskList)
                }
            } catch (error) {
                console.error(error)
            }
        }
        allTasks();
    }, [])

    return (<>
        <Navigation />
        <div>
            <h2>All Tasks</h2>
            <ul>
                {Array.isArray(tasks) && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id}>
                            {task.name} ({task.date})
                        </li>
                    ))
                ) : (
                    <li>No tasks available</li>
                )}
            </ul>
        </div>
    </>

    )
}
ViewAllTasks.propTypes = {
    state: PropTypes.shape({
        contract: PropTypes.shape({
            methods: PropTypes.object
        }),
        account: PropTypes.string
    }).isRequired
};

export default ViewAllTasks
/*
import React from "react";
import Navigation from "./Navigation";
import useViewAllTasks from "./useViewAllTasks";

const ViewAllTasks = ({ state }) => {
    const { tasks } = useViewAllTasks(state);

    return (
        <>
            <Navigation />
            <div>
                <h2>All Tasks</h2>
                <ul>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={task.id}>
                                {task.name} ({task.date})
                            </li>
                        ))
                    ) : (
                        <li>No tasks available</li>
                    )}
                </ul>
            </div>
        </>
    );
};
ViewAllTasks.propTypes = {
    state: PropTypes.shape({
        contract: PropTypes.shape({
            methods: PropTypes.object
        }),
        account: PropTypes.string
    }).isRequired
};

export default ViewAllTasks;
*/