import React, {useEffect, useState} from 'react'
import Navbar from "../Components/Editor/Navbar"
import TextEditor from "../Components/Editor/TextEditor/TextEditor"
import { useParams } from 'react-router-dom';
import axios from "axios"

export default function Editor() {

  const { id } = useParams();
  const [docData, setDocData] = useState({});
  const fetchDoc = async()=>{
    await axios.get(`/api/docs/${id}`).then((result)=>{
    if(result?.data?.Docs?._id){
    const data = result.data.Docs
    console.log(data)
    setDocData(()=>{
      return {...data}
    })
    }
  }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    if(id){
      console.log("helloId")
    fetchDoc()
    }
  },[id])

  return (
    <div>
    { docData.Data ?
      <>
        <Navbar paramId={id} Title={docData.Title}/> 
        <TextEditor value={docData} paramId={id}/>
      </> :
      <h1>
        Loading...
      </h1>
    }
    </div>
  )
}
