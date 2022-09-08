import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import style from './styles';

const Task = ({ task }) => {
  return (
    <>
        <li className={style.box}>
            <input type='checkbox' />
            <p className={style.text}>{task}</p>
            <button className={style.buttonDelete}><BsFillTrashFill size={20}/></button>
        </li>
    </>
  )
}

export default Task