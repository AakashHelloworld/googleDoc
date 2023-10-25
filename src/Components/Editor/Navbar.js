import React, { useState } from 'react'
import style from "../../Styles/Navbar.module.css"
import axios from "axios"
import Modal from '../Form_Modal/Modal'

export default function Navbar({Title,paramId}) {
  const [tilePop, setTitlepop] = useState(false)
  const [titleText, setTitleText] = useState(Title)
  const titlePop = () =>{
    setTitlepop(true)
  }
  const tileupdatehandler = async()=>{
    if(titleText == "") {
      setTitlepop(false)
    }else{
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
    console.log(titleText)
    await instance.post(`/api/docs/update/${paramId}/title`, {Title: titleText}).then((result)=>{
      console.log(result.data.Doc.Title)
      setTitleText(result.data.Doc.Title)
      setTitlepop(false)
    }).catch((err)=>{})
  }
  }

  const popUpCloser = (e)=>{
    console.log("Close", e)
      if(e.target.value == "TitlepopUpContainer"){
        setTitlepop(false)
      }
  }


  return (
    <div className={style.Navbar}>
      <div className={style.logo}>
        <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
      </div>
      <div>
        <div className={style.tileContainer} onClick={titlePop}>
            <span className={style.tileText}>{titleText}</span>
        </div>
        <div className={style.linkContainer}>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Insert</span>
            <span>Format</span>
        </div>
      </div>
    <Modal isOpen={tilePop}>
        <div value={"TitlepopUpContainer"} className={style.TitlepopUpMainContainer} onClick={popUpCloser}>
        <div className={style.TitlepopUpContainer}>
              <input value={titleText} onChange={(e) => setTitleText(e.target.value)} type='text' />

              <button onClick={tileupdatehandler}>Submit</button>
        </div>
        </div>

    </Modal>
    </div>
  )
}
