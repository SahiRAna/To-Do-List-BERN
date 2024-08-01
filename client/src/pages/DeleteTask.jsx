// import React from "react";
import Navigation from "./Navigation";
import PropTypes from "prop-types";
import useViewAllTasks from "./useViewAllTasks";

const DeleteTask = ({ state }) => {
    const { tasks, setTasks, fetchTasks } = useViewAllTasks(state.contract);

    const deleteTask = async (event, taskId, index) => {
        event.preventDefault();
        const { contract, account } = state;
        if (!contract || !contract.methods || !account) {
            console.error("Contract or account not available");
            return;
        }

        console.log(`Deleting task with ID: ${taskId}`);

        try {
            await contract.methods.deleteTask(taskId).send({ from: account });
            // Update local task list by removing the deleted task
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);

            setTasks(updatedTasks);
            fetchTasks();

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    if (!state.contract || !state.account) {
        return <div>Loading...</div>;
    }

    /*    const myArray = [1, 2, 3, 4, 5];
        let x = 0
        for (let i = 1; i < myArray.length; i++) {
    
            x = myArray.splice(i, 1);
        }
    
    
        console.log(`myArray values: ${myArray}`);
        console.log(`variable x value: ${x}`);
        console.log(myArray.length, 'hello');
        */


    return (
        <>

            <Navigation />
            <div>
                <h2>Delete Task List</h2>
                <ul>
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <li key={task.id}>
                                {task.name} ({task.date})
                                <button onClick={(event) => deleteTask(event, task.id, index)}>Delete</button>
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

DeleteTask.propTypes = {
    state: PropTypes.shape({
        contract: PropTypes.shape({
            methods: PropTypes.object
        }),
        account: PropTypes.string
    }).isRequired
};

export default DeleteTask;
