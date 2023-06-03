import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterTasksType = 'All' | 'Active' | 'Completed'
export type AssocArrType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [tasks, setTasks] = useState<AssocArrType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false}
        ]
    });

    const [toDo, setTodo] = useState([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'}
    ]);

    const changeStatus = (toDoId: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)});
    };
    const addTask = (toDoId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [toDoId]: [newTask, ...tasks[toDoId]]});
    };
    const removeTasks = (toDoId: string, taskId: string) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].filter(el => el.id !== taskId)});
    };
    const changeFilter = (toDoId: string, value: FilterTasksType) => {
        setTodo(toDo.map(t => t.id === toDoId ? {...t, filter: value} : t));
    };

    return (
        <div className="App">
            {toDo.map(el => {
                let filteredTasks = tasks[el.id];
                if (el.filter === 'Active') {
                    filteredTasks = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === 'Completed') {
                    filteredTasks = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <Todolist ToDoTitle={el.title}
                              key={el.id}
                              toDoId={el.id}
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
