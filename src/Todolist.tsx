import React, {useState, KeyboardEvent} from 'react';
import {FilterTasksType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterTasksType) => void
    removeTasks: (taskId: string) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const onKeyDownHandler =(e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const removeTaskHandler = (taskId: string)=>{
        props.removeTasks(taskId)
    }

    const tsarFilter =(value: FilterTasksType)=>{
        props.changeFilter(value)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onKeyDown={onKeyDownHandler} value={title} onChange={(e)=> {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(el => {
                return <li key={el.id}>
                    <button onClick={()=> removeTaskHandler(el.id)}>X</button>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}
                    </span>
                </li>;
            })}
        </ul>
        <div>
            <button onClick={()=>tsarFilter('All')}>All</button>
            <button onClick={()=>tsarFilter('Active')}>Active</button>
            <button onClick={()=>tsarFilter('Completed')}>Completed</button>
        </div>
    </div>;
}
