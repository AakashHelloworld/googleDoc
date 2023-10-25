import React from 'react'
import style from '../Styles/Form.module.css'
const Button = ({value, clickHandler, children, active}) => {
  return (
        <button className={style.buttonicon} value={value} onClick={clickHandler}
        > 
        {children}
        </button>
    )
}

export default Button