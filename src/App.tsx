import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterTasksType = 'All' | 'Active' | 'Completed'
export type ToDoListType = {
    id: string
    title: string
    filter: FilterTasksType
}
export type TaskAssocType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const [toDoLists, setToDoList] = useState<ToDoListType[]>([
            {id: todolistID1, title: 'What to learn', filter: 'All'},
            {id: todolistID2, title: 'What to buy', filter: 'All'}
        ]);
    let [tasks, setTasks] = useState<TaskAssocType>({
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

    const changeStatus = (toDoListId: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].map(el=> el.id === taskId ? {...el, isDone: newIsDone}: el)})
    };
    const addTask = (toDoListId: string,title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [toDoListId]: [newTask,...tasks[toDoListId]]})

    };
    const removeTasks = (toDoListId: string,taskId: string) => {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].filter(el=> el.id !== taskId)})
    };
    const changeFilter = (toDoListId: string, value: FilterTasksType) => {
        setToDoList(toDoLists.map(td => td.id === toDoListId ? {...td, filter: value} : td));
    };
    const removeToDoList = (toDoListId: string)=>{
        setToDoList(toDoLists.filter(el=> el.id !== toDoListId))
    }


    return (
        <div className="App">
            {toDoLists.map(td => {
                let filteredTasks = tasks[td.id];
                if (td.filter === 'Active') {
                    filteredTasks = tasks[td.id].filter(t => !t.isDone);
                }
                if (td.filter === 'Completed') {
                    filteredTasks = tasks[td.id].filter(t => t.isDone);
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
                        removeToDoList={removeToDoList}
                    />
                );
            })}
        </div>
    );
}

export default App;
