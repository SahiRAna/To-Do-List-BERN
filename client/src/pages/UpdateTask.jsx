import Navigation from './Navigation';
import PropTypes from "prop-types";
const UpdateTask = ({ state }) => {
    const updateTask = async (event) => {
        event.preventDefault();
        const { contract, account } = state;
        const taskName = document.querySelector('#taskName').value;
        const taskDate = document.querySelector('#taskDate').value;
        const taskId = document.querySelector('#taskId').value;

        try {
            const res = await fetch(
                'http://localhost:3000/api/ethereum/update-Task', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ taskDate: taskDate })
            })
            const data = await res.json();
            // console.log(data);
            if (data.status === 200) {
                await contract.methods.updateTask(taskId, taskName, taskDate).send({ 'from': account })
            }
        } catch (error) {
            console.error(error)
        }
    }

    if (!state.contract || !state.account) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Navigation />
            <div className="create_task todo_btn">
                <form onSubmit={updateTask}>
                    <label >
                        ID:
                        <input type="integer" name="ID" id="taskId" />
                    </label>
                    <label>
                        Name:
                        <input id="taskName" />
                    </label>
                    <label>
                        Date:
                        <input id="taskDate" type="date" />
                    </label>
                    <button type="submit">Update Task</button>
                </form>
            </div>
        </>
    )
}
UpdateTask.propTypes = {
    state: PropTypes.shape({
        contract: PropTypes.shape({
            methods: PropTypes.object
        }),
        account: PropTypes.string
    }).isRequired
};
export default UpdateTask