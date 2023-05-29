import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterTasksType = 'All' | 'Active' | 'Completed'
export type ToDoListType = {
    id: string
    title: string
    filter: FilterTasksType
}

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ]);
    // const [filter, setFiler] = useState<FilterTasksType>('All');

    const changeStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el));
    };

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([...tasks, newTask]);

    };
    const removeTasks = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };


    const changeFilter = (toDoListId: string, value: FilterTasksType) => {
        setToDoList(toDoLists.map(td => td.id === toDoListId ? {...td, filter: value} : td))
    };

    const [toDoLists, setToDoList] = useState<ToDoListType[]>([
            {id: v1(), title: 'What to learn', filter: 'All'},
            {id: v1(), title: 'What to buy', filter: 'Active'}
        ]
    );

    return (
        <div className="App">
            {toDoLists.map(td => {
                let filteredTasks = tasks;
                if (td.filter === 'Active') {
                    filteredTasks = tasks.filter(t => !t.isDone);
                }
                if (td.filter === 'Completed') {
                    filteredTasks = tasks.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={td.id}
                        toDoListId={td.id}
                        title={td.title}
                        tasks={filteredTasks}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                    />
                );
            })}
        </div>
    );
}

export default App;
