import React, { useEffect, useState } from 'react'
import style from "../../Styles/Doc.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
import axios from 'axios'
import {ImCross} from "react-icons/im"
import Modal from '../Form_Modal/Modal'
import { Link } from 'react-router-dom'


const Blank =({data,DeleteDoc})=>{
  const [popupStatus, SetpopupStatus] = useState(false);

  const popupHandler = () =>{

    SetpopupStatus(!popupStatus)
  }

  const deleteHandler = ()=>{
    DeleteDoc(data._id, data.CreatedBy)
    SetpopupStatus(!popupStatus)
  }

  

  return(
        <div key={data._id} className={style.doc}>
        <div className={style.docFirst}>
        </div>
        <div className={style.docSecond}>
          <div className={style.docDetail}>
          <Link to={`/doc/${data._id}`}>
          <p>{data.Title}</p>
          <div>
          <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
          <span>opened:{data.CreatedAt}</span>
          </div>
          </Link>
          <div          
className={style.iconcontainer} onClick={popupHandler}>
            <BiDotsVerticalRounded className={style.icon}/>
          </div>
          </div>
        </div>
              <Modal isOpen={popupStatus}>
                      <div className={style.modalContainer}>
                          <div className={style.iconContainer}><ImCross onClick={popupHandler} /></div>
                          <ul>
                            <li >Rename</li>
                            <li onClick={deleteHandler}>Delete</li>
                          </ul>
                      </div>
              </Modal>
        </div>

  )


}









export default function AllDoc() {
    const [AllDoc, setAllDoc] = useState([]);
  useEffect(()=>{
    fetchDoc()
  },[])

    const DeleteDoc = (DocId, UserId)=>{
      axios.delete(`http://localhost:4000/api/docs/delete/${DocId}/${UserId}`).then((result)=>{

        if(result?.data?.Docs?.length)
        {

        const Arr = result.data.Docs
        const finalArr = Arr.map((data)=>{

          let date = new Date(data.CreatedAt);
          let options = { year: 'numeric', month: 'short', day: 'numeric' };
          let formattedDate = date.toLocaleDateString('en-US', options);
          return {...data, CreatedAt:formattedDate}
        })
        setAllDoc(finalArr)
      }

      }).catch((err)=>{
        console.log(err)
      })

    }

    const fetchDoc = async()=>{
        await axios.get('http://localhost:4000/api/docs/all/12374446238').then((result)=>{

            if(result?.data?.Docs?.length)
            {

            const Arr = result.data.Docs
            const finalArr = Arr.map((data)=>{

              let date = new Date(data.CreatedAt);
              let options = { year: 'numeric', month: 'short', day: 'numeric' };
              let formattedDate = date.toLocaleDateString('en-US', options);
              return {...data, CreatedAt:formattedDate}
            })
            setAllDoc(finalArr)
          }

        }).catch((err)=>{
          console.log(err)
        })
    }

  return (
    <div className={style.AllDocContainer}>
    <div className={style.SubContainer}>
    <div className={style.CreateText}>
        <span>Recent documents</span>
    </div>
    <div className={style.DocSubContainer}>


    {  !!AllDoc?.length&& AllDoc.map((data)=>{
      return(  
        <Blank data={data} DeleteDoc={DeleteDoc} />
        )
        } )
    }
    </div>
    </div>
    </div>
  )
}
