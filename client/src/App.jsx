import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Navigation from './pages/Navigation';
import Wallet from './pages/Wallet'
import CreateTask from './pages/CreateTask';
import DeleteTask from './pages/DeleteTask'
import UpdateTask from './pages/UpdateTask'
import ViewAllTasks from './pages/ViewAllTasks'
import ViewTask from './pages/ViewTask'

function App() {
  const [state, setState] = useState({ web3: null, contract: null, account: null })
  const saveState = ({ web3, contract, account }) => {
    setState({ web3: web3, contract: contract, account: account })
  }
  const router = createBrowserRouter([
    { path: '/', element: <Wallet saveState={saveState} /> },
    // { path: '/Navigation', element: <Navigation /> },
    { path: '/view-task', element: <ViewTask /> },
    { path: '/create-Task', element: <CreateTask state={state} /> },
    { path: '/delete-Task', element: <DeleteTask state={state} /> },
    { path: '/update-task', element: <UpdateTask state={state} /> },
    { path: '/view-all-Task', element: <ViewAllTasks state={state} /> },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
