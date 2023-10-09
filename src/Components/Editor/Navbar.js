import React from 'react'
import style from "../../Styles/Navbar.module.css"
export default function Navbar() {
  return (
    <div className={style.Navbar}>
      <div className={style.logo}>
        <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
      </div>
      <div>
        <div className={style.tileContainer}>
            <span className={style.tileText}>Untitled document</span>
        </div>
        <div className={style.linkContainer}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Insert</span>
            <span>Format</span>
        </div>
      </div>
    </div>
  )
}
