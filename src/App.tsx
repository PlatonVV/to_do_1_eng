import React from 'react';
import './App.css';
import {Todolist} from './Todolist';


function App() {
    const firstTasks = [
        {id: 1, title: 'Redux', isDone: true}, // 0
        {id: 2, title: 'Store', isDone: true}, // 1
        {id: 3, title: 'Thunk', isDone: false} // 2
    ];
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={firstTasks}/>
        </div>
    );
}

export default App;
