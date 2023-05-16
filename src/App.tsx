import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterTasksType = 'All' | 'Active' | 'Completed'


function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ]);

    const addTask =(title: string)=>{
        let newTask = {id: v1(), title: title, isDone: true}
        setTasks([...tasks, newTask])

    }
    const [filter, setFiler] = useState<FilterTasksType>('All');

    const removeTasks = (taskId: string) => {
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
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
