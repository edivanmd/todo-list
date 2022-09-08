import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import Task from './Task';
import style from './styles';

const Home = () => {
    const [tasks, setTasks] = useState(['Pay rent', 'Call Anne']);

    return (
        <div className="container mx-auto">
            <h3 className={style.heading}>My Todo List</h3>
            <form className={style.form} action="">
                <input className={style.input} type='text' placeholder='Add new task' />
                <button className={style.buttonAdd}><AiFillPlusCircle size={30} color="#fff" /></button>
            </form>
            <p className={style.count}> You have got 3 tasks</p>
            <ul className={style.gridContainer}>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </ul>
        </div>
    )
}

export default Home