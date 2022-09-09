import React, { useState, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { db } from '../firebase';
import { collection, onSnapshot, query, updateDoc, doc } from 'firebase/firestore';
import Task from './Task';
import style from './styles';

const Home = () => {
    const [tasks, setTasks] = useState([]);


    //Create task

    //Read task
    useEffect(() => {
        const q = query(collection(db, 'tasks'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let tasksArr = [];
          querySnapshot.forEach((doc) => {
            tasksArr.push({...doc.data(), id: doc.id})
          });
          setTasks(tasksArr);
        });
        return () => unsubscribe();
    },[])

    //Update task
    const toggleComplete = async (task) => {
        await updateDoc(doc(db, 'tasks', task.id), {
            completed: !task.completed
        })
    }

    //Delete task

    return (
        <div className={style.wrapHome}>
            <h3 className={style.heading}>My Todo List</h3>
            <form className={style.form} action="">
                <input className={style.input} type='text' placeholder='Add new task' />
                <button className={style.buttonAdd}><AiFillPlusCircle size={30} color="#fff" /></button>
            </form>
            <p className={style.count}> You have got 3 tasks</p>
            <ul className={style.gridContainer}>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} toggleComplete={toggleComplete} />
                ))}
            </ul>
        </div>
    )
}

export default Home