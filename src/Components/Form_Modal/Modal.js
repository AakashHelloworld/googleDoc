import React from 'react'
import style from '../../Styles/Form.module.css'
const Modal = ({children, isOpen}) => {
    if(!isOpen) return
  return (
    <>
        {children}
    </>  
    )
}

export default Modal