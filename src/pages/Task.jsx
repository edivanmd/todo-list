import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import style from './styles';

const Task = ({ task }) => {
  return (
    <>
        <li className={style.box}>
            <div className={style.info}>
              <input className={style.checkbox} type='checkbox' />
              <p className={style.text}>{task.text}</p>
            </div>
            <button className={style.buttonDelete}><span>Remove task</span> <BsFillTrashFill size={20}/></button>
        </li>
    </>
  )
}

export default Task