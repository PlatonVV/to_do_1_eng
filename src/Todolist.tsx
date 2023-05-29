import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterTasksType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    toDoListId: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (toDoListId: string,value: FilterTasksType) => void
    removeTasks: (taskId: string) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false)
    const [buttonName, setButtonName] = useState<FilterTasksType>('All')

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    };
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError(true)
        }
    };
    const removeTaskHandler = (taskId: string) => {
        props.removeTasks(taskId);
    };
    const tsarFilter = (toDoListId: string, value: FilterTasksType) => {
        props.changeFilter(props.toDoListId,value);
        setButtonName(value)
    };
    const onChangeStatusHadler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(taskId, e.currentTarget.checked);
    };

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''} onKeyDown={onKeyDownHandler} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value);
            }}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>Title is requiared</div>}
        </div>
        <ul>
            {props.tasks.map(el => {
                return <li key={el.id} className={el.isDone ? s.isDone : ''}>
                    <button onClick={() => removeTaskHandler(el.id)}>X</button>
                    <input type="checkbox" checked={el.isDone}
                           onChange={(e) => onChangeStatusHadler(el.id, e)}
                    />
                    <span>{el.title}
                    </span>
                </li>;
            })}
        </ul>
        <div>
            <button className={buttonName === 'All' ? s.activeFilter : ''} onClick={() => tsarFilter(props.toDoListId,'All')}>All</button>
            <button className={buttonName === 'Active' ? s.activeFilter : ''} onClick={() => tsarFilter(props.toDoListId,'Active')}>Active</button>
            <button className={buttonName === 'Completed' ? s.activeFilter : ''} onClick={() => tsarFilter(props.toDoListId,'Completed')}>Completed</button>
        </div>
    </div>;
}
