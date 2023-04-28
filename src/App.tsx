import React from 'react';
import './App.css';
import {Todolist} from './Todolist';


function App() {
    const firstTasks = [
        {id: 1, title: 'Redux', isDone: true}, // 0
        {id: 2, title: 'Store', isDone: true}, // 1
        {id: 3, title: 'Thunk', isDone: false} // 2
    ];
    const secondTasks = [
        {id: 1, title: 'Pineapple', isDone: true},
        {id: 2, title: 'Orange', isDone: false},
        {id: 3, title: 'Watermelon', isDone: false},
        {id: 4, title: 'orange', isDone: true}
    ];

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={firstTasks}/>
            <Todolist title={'What to buy'} tasks={secondTasks}/>
        </div>
    );
}

export default App;
