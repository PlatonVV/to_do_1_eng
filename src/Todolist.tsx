import React from 'react';

type PropsType = {
    title: string
    tasks: TasksType[]
}

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist: React.FC<PropsType> = ({title, tasks}) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map((el) => {
                return (
                    <li>
                        <button onClick={()=> console.log('click')}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                );
            })}

        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>;
};
