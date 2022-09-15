import React, {useState} from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import style from './styles';
import Modal from './Modal';

// const Task = ({ task, toggleComplete, deleteTask }) => {
const Task = ({ task, toggleComplete, deleteTask, handleShow }) => {

  return (
    <>
        <li className={task.completed ? style.boxCompleted : style.box}>
            <div className={task.completed ? style.infoCompleted : style.info}>
              <input onChange={() => toggleComplete(task)} className={style.checkbox} type='checkbox' checked={task.completed ? 'checked' : ''} />
              <p onClick={() => toggleComplete(task)} className={task.completed ? style.textCompleted : style.text}>{task.text}</p>
            </div>
            {/* <button onClick={() => deleteTask(task.id)} className={style.buttonDelete}><span>Remove task</span> <BsFillTrashFill size={20}/></button> */}
            <button onClick={() => handleShow(task)} className={style.buttonDelete}><span>Remove task</span> <BsFillTrashFill size={20}/></button>
        </li>
    </>
  )
}

export default Task