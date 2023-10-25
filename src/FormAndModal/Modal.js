import React from 'react'
const Modal = ({children, isOpen}) => {
    if(!isOpen) return
  return (
    <>
        {children}
    </>  
    )
}

export default Modal