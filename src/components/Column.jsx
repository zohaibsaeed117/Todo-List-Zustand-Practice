import React, { useState } from 'react'
import Task from './Task'
import { useStore } from '../store'

const Column = ({ state }) => {
    const tasks = useStore(store => store.tasks.filter(task => task.state === state))
    const addTask = useStore(store => store.addTask)
    const moveTask = useStore(store => store.moveTask)
    let draggedTask = useStore(store => store.draggedTask)
    const [title, setTitle] = useState("");

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDrop = () => {
        moveTask(draggedTask, state)
    }
    const handleClick = () => {
        addTask(title, state)
        setTitle("")
    }
    return (
        <>
            <div className='bg-gray-800 w-80 text-white rounded' onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <div className='flex justify-between m-2'>
                    <p className='text-center'>{state}</p>
                    <button className='btn btn-primary' onClick={() => {
                        document.getElementById(`${state}`).showModal()
                    }} >Add</button>
                </div>
                {
                    tasks.map(task => <Task title={task.title} state={task.state} key={task.title} />)
                }
                <dialog id={`${state}`} className="modal">
                    <div className="modal-action">
                        <input type="text" value={title} onChange={handleChange} placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" />
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-success" onClick={handleClick}>Done</button>
                        </form>
                    </div>
                </dialog>
            </div >
        </>
    )
}

export default Column
