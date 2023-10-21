import React from 'react'
import style from "../../Styles/Doc.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
export default function AllDoc() {
  return (
    <div className={style.AllDocContainer}>
    <div className={style.SubContainer}>
    <div className={style.CreateText}>
        <span>Recent documents</span>
    </div>
    <div className={style.DocSubContainer}>

    <div className={style.doc}>

    <div className={style.docFirst}>
    </div>
    <div className={style.docSecond}>
      <p>Title Name</p>
      <div className={style.docDetail}>
      <div>
      <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
      <span>opened:</span>
      </div>
      <div className={style.iconcontainer}>
        <BiDotsVerticalRounded className={style.icon}/>
      </div>
      </div>
    </div>

    </div>
        
    </div>
    </div>
    </div>
  )
}
