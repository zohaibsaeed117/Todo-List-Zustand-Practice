import React, { useEffect, useState } from 'react'
import { useStore } from '../store';


const Task = ({ title, state }) => {
    const tasks = useStore(store => store.tasks.filter(task => task.state === state))
    console.log(tasks)
    const [updatedTitle, setUpdatedTitle] = useState(title)
    const [statusColor, setStatusColor] = useState("");
    const deleteTask = useStore(store => store.deleteTask);
    const editTask = useStore(store => store.editTask);
    const setDraggedTask = useStore(store => store.setDraggedTask)

    const handleChange = (e) => {
        setUpdatedTitle(e.target.value)
    }
    const handleDelete = () => {
        deleteTask(title)
    }
    const handleEdit = () => {
        editTask(title, updatedTitle, state)
    }
    useEffect(() => {
        setStatusColor(() => {
            if (state === "DONE") {
                return "badge-error"
            } else if (state === "ONGOING") {
                return "badge-ghost"
            } else {
                return "badge-primary"
            }
        })
    }, [])
    const modalId = `modal-${Math.floor(Math.random() * 100) + 1}`;
    const handleDragStart = () => {
        setDraggedTask(title)
    }
    return (
        <>
            <div className='bg-white text-black h-20 w-[90%] mx-auto my-2 rounded cursor-move' draggable onDragStart={handleDragStart}>
                <div className='flex justify-between items-center'>
                    <p className='font-semibold mx-2'>{title}</p>
                    <div className={`badge ${statusColor}`}>{state}</div>
                </div>
                <div className='flex items-end my-4 justify-end gap-2'>
                    <button className='btn btn-primary btn-sm' onClick={() => {
                        document.getElementById(`${modalId}`).showModal()
                    }}>Edit Task</button>
                    <button className='btn btn-error btn-sm' onClick={handleDelete}>Delete Task</button>
                </div>
            </div>
            <dialog id={modalId} className="modal">
                <div className="modal-action">
                    <input type="text" onChange={handleChange} value={updatedTitle} placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" />
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-success" onClick={handleEdit}>Done</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default Task
