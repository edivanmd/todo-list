import React, { useState, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { db } from '../firebase';
import { collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc, where } from 'firebase/firestore';
import Task from './Task';
import Modal from './Modal';
import style from './styles';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [tasks2, setTasks2] = useState([]);
    const [input, setInput] = useState("");

    const [modal, setModal] = useState(false);
    const [details, setDetails] = useState({});

    const handleClose = () => setModal(!modal)
    const handleShow = (task) => {
        setModal(!modal);
        setDetails(task);
    }
    
    //Create task
    const createTask = async (e) => {
        e.preventDefault(e);
        if(input === '') {
            alert('Please, enter a valid task')
            return
        }
        await addDoc(collection(db, 'tasks'), {
            text:input,
            completed: false,
        });
        setInput('');
    }

    //Read task
    useEffect(() => {
        const q = query(collection(db, 'tasks'));
        const q2 = query(collection(db, 'tasks'), where("completed", "==", false));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let tasksArr = [];
          querySnapshot.forEach((doc) => {
            tasksArr.push({...doc.data(), id: doc.id})
          });
          setTasks(tasksArr);
        });

        const unsubscribe2 = onSnapshot(q2, (querySnapshot2) => {
            let tasksArr2 = [];
            querySnapshot2.forEach((doc) => {
            tasksArr2.push({...doc.data(), id: doc.id})
            });
            setTasks2(tasksArr2);
        });
        return () => {unsubscribe(); unsubscribe2()};
    },[])


    //Update task
    const toggleComplete = async (task) => {
        await updateDoc(doc(db, 'tasks', task.id), {
            completed: !task.completed
        })
    }

    //Delete task
    const deleteTask = async (id) => {
        await deleteDoc(doc(db, 'tasks', id));
        handleClose();
    }

    return (
        <div className={style.wrapHome}>
            <h3 className={style.heading}>My Todo List</h3>
            <form className={style.form} onSubmit={createTask}>
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    className={style.input} 
                    type='text' 
                    placeholder='Add a new task' 
                />
                <button className={style.buttonAdd}><AiFillPlusCircle size={30} color="#fff" /></button>
            </form>


            {tasks.length < 1 ? null : <p className={style.count}> You have got <span className={style.numberCount}>{`${tasks2.length}`}</span> tasks to be completed</p>  }
            <ul className={style.gridContainer}>
                {tasks.map((task, index) => (
                    <Task 
                        key={index} 
                        task={task} 
                        toggleComplete={toggleComplete} 
                        deleteTask={deleteTask}
                        handleShow={handleShow}
                    />
                    ))}
            </ul>
            
            <Modal 
                open={modal}
                handleClose={handleClose}
                details={details}
                deleteTask={deleteTask}
            />
        </div>

    )
}

export default Home