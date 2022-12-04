import React, {useState} from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import style from './styles';
import { motion } from "framer-motion";


// Motion Animation
const gridConta = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
      opacity: 1,
      scale: 1,
      transition: {
          delayChildren: 0.5,
          staggerChildren: 0.5
      }
  }
}

const child = {
  hidden: { y: 500, opacity: 0 },
  visible: {
      y: 0,
      opacity: 1
  }
};
// Motion Animation

const Task = ({ task, toggleComplete, deleteTask, handleShow }) => {

  return (
      <motion.li 
        variants={gridConta}
        className=
        {
          task.completed 
          ? 'p-4 bg-lightGray rounded-md capitalize flex flex-col justify-between' 
          : 'p-4 bg-dark rounded-md capitalize flex flex-col justify-between'
        }
      >

          <motion.div variants={child} className={task.completed ? style.infoCompleted : style.info}>
            <input onChange={() => toggleComplete(task)} className={style.checkbox} type='checkbox' checked={task.completed ? 'checked' : ''} />
            <motion.p variants={child}  onClick={() => toggleComplete(task)} className={task.completed ? style.textCompleted : style.text}>{task.text}</motion.p>
          </motion.div>
          <motion.button variants={child}  onClick={() => handleShow(task)} className={style.buttonDelete}><span>Remove task</span> <BsFillTrashFill size={20}/></motion.button>
      </motion.li>

  )
}

export default Task