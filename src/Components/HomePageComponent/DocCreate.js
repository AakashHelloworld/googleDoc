import React from 'react'
import style from "../../Styles/HomePage.module.css"
export default function DocCreate() {
  return (
    <div className={style.CreateContainer}>
    <div className={style.SubContainer}>
    <div className={style.CreateText}>
        <span>Start a new document</span>
    </div>
    <div className={style.blankContainer}>
        <div className={style.blank}>
            <img src='https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png' />
        </div>
        <span>Blank</span>
    </div>
    </div>
    
    </div>
  )
}
