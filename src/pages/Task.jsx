import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import style from './styles';

const Task = ({ task }) => {
  return (
    <>
        <li className={task.completed ? style.boxCompleted : style.box}>
            <div className={task.completed ? style.infoCompleted : style.info}>
              <input className={style.checkbox} type='checkbox' checked={task.completed ? 'checked' : ''} />
              <p className={task.completed ? style.textCompleted : style.text}>{task.text}</p>
            </div>
            <button className={style.buttonDelete}><span>Remove task</span> <BsFillTrashFill size={20}/></button>
        </li>
    </>
  )
}

export default Task