import React, { useState, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { db } from '../firebase';
import { collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc, where } from 'firebase/firestore';
import Task from './Task';
import Modal from './Modal';
import style from './styles';
import { AnimatePresence, motion } from "framer-motion";

// Motion Animation
const gridContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.9,
            staggerChildren: 0.1
        }
    }
}

const child = {
    hidden: { y: 40, opacity: 0 },
    visible: {y: 0, opacity: 1}
};

const Loading = () => (
    <p>HELLO</p>
)

// Motion Animation

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

    //Loader
    if (!tasks.length > 0) return (
        <div role="status" className='h-screen flex justify-center items-center'>
            <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    )
    //Loader


    return (
        <motion.div className={style.wrapHome} variants={gridContainer} initial="hidden" animate={tasks.length > 0 && "visible"}>
            <motion.h3 variants={child} className={style.heading}>My Todo List</motion.h3>
            <motion.form variants={child} className={style.form} onSubmit={createTask}>
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    className={style.input} 
                    type='text' 
                    placeholder='Add a new task' 
                    />
                <button className={style.buttonAdd}><AiFillPlusCircle size={30} color="#fff" /></button>
            </motion.form>
                <AnimatePresence>
                    <motion.div variants={child}>
                        {tasks.length < 1 
                            ? null 
                            : <motion.p className={style.count}> You have got <span className={style.numberCount}>{`${tasks2.length}`}</span> tasks to be completed</motion.p>  
                        }
                    </motion.div>
                </AnimatePresence>

                <motion.ul 
                    //variants={child}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 gridContainer'
                >
                    <AnimatePresence>
                        {tasks.map((task, index) => (
                        
                            <Task
                                key={index} 
                                task={task} 
                                toggleComplete={toggleComplete} 
                                deleteTask={deleteTask}
                                handleShow={handleShow}
                            />
                            // <motion.li key={index} className="bg-black rounded-full w-5 h-5" variants={child}  />
                        ))}
                    </AnimatePresence>
                </motion.ul>

            <Modal 
                open={modal}
                handleClose={handleClose}
                details={details}
                deleteTask={deleteTask}
                />
        </motion.div>

    )
}

export default Home