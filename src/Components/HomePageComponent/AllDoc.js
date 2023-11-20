import React, { useEffect, useState } from 'react'
import style from "../../Styles/Doc.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
import axios from 'axios'
import {ImCross} from "react-icons/im"
import { Link } from 'react-router-dom'
import Modal from '../../FormAndModal/Modal'
import { useNavigate } from 'react-router-dom'

const Blank =({data,setEditModal,editModal,deleteDoc,shared,editDoc, text, setText})=>{
  const navigate = useNavigate();
  const [popupStatus, SetpopupStatus] = useState(false);


  const popupHandler = () =>{
    SetpopupStatus(!popupStatus)
  }

  const deleteHandler = ()=>{
    deleteDoc(data._id)
    SetpopupStatus(!popupStatus)
  }

  const editHandler = ()=>{
    editDoc(data._id)
    setEditModal(false)
  }

  

  return(
        <div key={data._id} className={style.doc} >
        <div className={style.docFirst} onClick={(e)=>{
            e.stopPropagation();
          navigate(`/doc/${data._id}/${shared}`)}}>
        </div>
        <div className={style.docSecond}>
          <div className={style.docDetail}>
          <Link to={`/doc/${data._id}/${shared}`}>
          <p>{data.Title}</p>
          <div>
          <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
          <span>opened:{data.CreatedAt}</span>
          </div>
          </Link>
          { !shared &&
          <div          
className={style.iconcontainer} onClick={popupHandler}>
            <BiDotsVerticalRounded className={style.icon}/>
          </div>
          }
          </div>
        </div>
              <Modal isOpen={popupStatus}> 
                      <div className={style.modalContainer}>
                          <div className={style.iconContainer}><ImCross onClick={popupHandler} /></div>
                          <ul>
                            <li onClick={()=>{
                            setEditModal(true)
                            SetpopupStatus(false)
                            }}>Rename</li>
                            <li onClick={deleteHandler}>Delete</li>
                          </ul>
                      </div>
              </Modal>
              <Modal isOpen={editModal}>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh", width:"100vw", position:"fixed", zIndex:1, backgroundColor:"rgba(0,0,0,0.5)", top:0, left:0}}>
                      <form style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"50%", width:"50%", padding:"1rem 2rem", fontSize:"1.2rem", backgroundColor:"white"}} onSubmit={editHandler}
                      >
                            <input value={text} onChange={(e)=>{setText(e.target.value)}} style={{padding:"1rem 2rem", outline:"none", border:"1px solid gray", borderRadius:"8px", width:"90%", fontSize:"1.2rem"}} type="text" />
                            <button style={{padding:"1rem 2rem", outline:"none", border:"1px solid gray", borderRadius:"8px", width:"90%", marginTop:"1rem", cursor:"pointer", fontSize:"1.2rem"}} type='submit'>Update</button>
                      </form>
                  </div>
              </Modal>

        </div>

  )


}









export default function AllDoc({userId}) {
    const [AllDoc, setAllDoc] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [text, setText] = useState("");
    const [SharedDoc, setSharedDoc] = useState([]);
  useEffect(()=>{
    fetchDoc()
    sharedDoc()
  },[])

    const deleteDoc = (DocId)=>{
      axios.delete(`http://localhost:4000/api/docs/delete/${DocId}/${userId}`).then((result)=>{

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
        await axios.get(`http://localhost:4000/api/docs/all/${userId}`).then((result)=>{

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

    const sharedDoc = async()=>{
      await axios .get(`http://localhost:4000/api/docs/shared/${userId}`).then((result)=>{
        if(result?.data?.Docs?.length)
        {

        const Arr = result.data.Docs
        const finalArr = Arr.map((data)=>{

          let date = new Date(data.CreatedAt);
          let options = { year: 'numeric', month: 'short', day: 'numeric' };
          let formattedDate = date.toLocaleDateString('en-US', options);
          return {...data, CreatedAt:formattedDate}
        })
        setSharedDoc(finalArr)
      }
      }).catch((err)=>{
        console.log(err)
      })
    }


    const editDoc = (DocId)=>{
      axios.post(`http://localhost:4000/api/docs/update/title/${DocId}/${userId}`, {Title:text}).then((result)=>{

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
      setText("")

    }      }).catch((err)=>{
        console.log(err)
      })
      setText("")
      
    }


  return (
    <div className={style.AllDocContainer}>
    <div className={style.SubContainer}>

    <div className={style.CreateText}>
        <span>Shared documents</span>
    </div>

    <div className={style.DocSubContainer}>
    {  !!SharedDoc?.length&& SharedDoc.map((data)=>{
      return(  
        <Blank  key={data._id} data={data} deleteDoc={deleteDoc} shared={true}/>
        )
        } )
    }
    </div>


    <div className={style.CreateText}>
        <span>Recent documents</span>
    </div>
    <div className={style.DocSubContainer}>


    {  !!AllDoc?.length&& AllDoc.map((data)=>{
      return(  
        <Blank setEditModal={setEditModal} editModal={editModal} setText={setText} text={text} editDoc={editDoc} key={data._id} data={data} deleteDoc={deleteDoc} shared={false} />
        )
        } )
    }
    </div>
    </div>
    </div>
  )
}
