import React from 'react'
import style from "../../Styles/Doc.module.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function DocCreate({userId}) {
  const navigate = useNavigate();

  const DocCreateHandler = async()=>{

    await axios.post(`/api/docs/${userId}`).then((result)=>{
      if(result?.data?.Doc?._id){
        const Id  = result.data.Doc._id
        navigate(`/Doc/${Id}`);
      }
    }).catch((Err)=>{
      console.log(Err)
    })
  }
  


 


  return (
    <div className={style.CreateContainer}>
    <div className={style.SubContainer}>
    <div className={style.CreateText}>
        <span>Start a new document</span>
    </div>
    <button style={{cursor:'pointer', backgroundColor:'transparent', border:'none'}}
      onClick={DocCreateHandler}
    >
    <div className={style.blankContainer}>
        <div className={style.blank}>
            <img src='https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png' />
        </div>
        <span>Blank</span>
    </div>
    </button>
    </div>
    
    </div>
  )
}
