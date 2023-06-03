import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterTasksType} from './App';
import s from './Todolist.module.css';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    toDoId: string
    ToDoTitle: string
    tasks: Array<TaskType>
    changeFilter: (toDoId: string, value: FilterTasksType) => void
    removeTasks: (toDoId: string, taskId: string) => void
    addTask: (toDoId: string, title: string) => void
    changeStatus: (toDoId: string, taskId: string, newIsDone: boolean) => void
}

export const Todolist: React.FC<PropsType> = ({
                                                  toDoId, ToDoTitle, tasks,
                                                  changeStatus, addTask, removeTasks, changeFilter
                                              }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
    const [buttonName, setButtonName] = useState<FilterTasksType>('All');

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    };
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addTask(toDoId, title.trim());
            setTitle('');
        } else {
            setError(true);
        }
    };
    const removeTaskHandler = (taskId: string) => {
        removeTasks(toDoId, taskId);
    };
    const tsarFilter = (value: FilterTasksType) => {
        changeFilter(toDoId, value);
        setButtonName(value);
    };
    const onChangeStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(toDoId, taskId, e.currentTarget.checked);
    };

    return <div>
        <h3>{title}</h3>
        <div>
            <input className={error ? s.error : ''} onKeyDown={onKeyDownHandler} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value);
            }}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {tasks.map(el => {
                return <li key={el.id} className={el.isDone ? s.isDone : ''}>
                    <button onClick={() => removeTaskHandler(el.id)}>X</button>
                    <input type="checkbox" checked={el.isDone}
                           onChange={(e) => onChangeStatusHandler(el.id, e)}
                    />
                    <span>{el.title}
                    </span>
                </li>;
            })}
        </ul>
        <div>
            <button className={buttonName === 'All' ? s.activeFilter : ''} onClick={() => tsarFilter('All')}>All
            </button>
            <button className={buttonName === 'Active' ? s.activeFilter : ''}
                    onClick={() => tsarFilter('Active')}>Active
            </button>
            <button className={buttonName === 'Completed' ? s.activeFilter : ''}
                    onClick={() => tsarFilter('Completed')}>Completed
            </button>
        </div>
    </div>;
};
