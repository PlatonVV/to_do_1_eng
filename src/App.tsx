import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterTasksType = 'All' | 'Active' | 'Completed'


function App() {

    // let tasks1 = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false }
    // ]

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]);

    const [filter, setFiler] = useState<FilterTasksType>('All');

    const removeTasks = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    };

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'Completed') {
        filteredTasks= tasks.filter(t => t.isDone);
    }


    const changeFilter = (value: FilterTasksType) => {
        setFiler(value);
    };


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={filteredTasks} removeTasks={removeTasks}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
