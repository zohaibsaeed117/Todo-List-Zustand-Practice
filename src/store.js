import { create } from "zustand"
import { devtools } from 'zustand/middleware'

const store = (set) => ({
    draggedTask: null,
    tasks: [{ title: "Test state", state: "ONGOING" }],
    addTask: (title, state) => {
        set(store => ({ tasks: [...store.tasks, { title, state }] }), false, "addTask")
    },
    deleteTask: title => {
        set(store => ({ tasks: store.tasks.filter(task => task.title !== title) }))
    },
    moveTask: (title, state) => {
        set(store => ({ tasks: store.tasks.map(task => task.title === title ? { title, state } : task) }))
        console.log("Tasks moved")
    },
    setDraggedTask: title => set({ draggedTask: title }),
    editTask: (title, updatedTitle, state) => {
        set(store => ({ tasks: store.tasks.map((task => task.title === title ? { title: updatedTitle, state: state } : task)) }))
    }

})

export const useStore = create(devtools(store))