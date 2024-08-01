import PropTypes from "prop-types";
import Navigation from "./Navigation";

const CreateTask = ({ state }) => {
    const createTask = async (event) => {
        event.preventDefault();
        const { contract, account } = state;
        if (!contract || !contract.methods || !account) {
            console.error("Contract or account not available");
            return;
        }
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        try {
            const res = await fetch("http://localhost:3000/api/ethereum/create-task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ taskDate: taskDate })
            });
            const data = await res.json();
            if (data.status === 200) {
                if (contract && contract.methods) {
                    await contract.methods
                        .createTask(taskName, taskDate)
                        .send({ from: account });
                    // setModalContent(`Task ${taskName} added at ${taskDate}`);
                }
            } else {
                alert("Task cannot be added");
            }

        } catch (error) {
            console.error(error);
            // setModalContent(`Task already exists at ${taskDate}`);
        }
        // finally {
        //     setModalOpen(true);
        // }
    }

    if (!state.contract || !state.account) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navigation />
            <div className="create_task todo_btn">
                <form onSubmit={createTask}>
                    <label>
                        Name:
                        <input id="taskName" />
                    </label>
                    <label>
                        Date:
                        <input id="taskDate" type="date" />
                    </label>
                    <button type="submit">Create Task</button>
                </form>

                {/* {modalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <p>{modalContent}</p>
                        </div>
                    </div>
                )} */}
            </div>
        </>
    );
}

CreateTask.propTypes = {
    state: PropTypes.shape({
        contract: PropTypes.shape({
            methods: PropTypes.object
        }),
        account: PropTypes.string
    }).isRequired
};

export default CreateTask;
