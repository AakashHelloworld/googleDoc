import React from 'react'
import style from "../../Styles/Doc.module.css"
import {BsSearch} from "react-icons/bs"
export default function NavBar({Image}) {
  return (
    <div className={style.HomeNavbar}>
  <div className={style.LogoContainer}>
    <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
    <span>Docs</span>
  </div>
  <div className={style.SearchContainer}>
  <BsSearch className={style.SearchIcon}/>
  <input type="search" id="gsearch" name="gsearch" placeholder='Search'></input>
  </div>
  <div className={style.userConatiner}>
      <img src={Image}/>
  </div>    
    </div>
  )
}
