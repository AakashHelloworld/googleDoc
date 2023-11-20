import React, {useState,useCallback, useEffect} from 'react'
import { createEditor, Editor } from 'slate'
import { Slate, withReact, Editable } from 'slate-react'
import Tools from './Tools'
import { MarkActive } from '../../Utils/markActive'
import { Leaf } from '../../SlateTools/leaf'
import { toggleBlock, isBlockActive, isMarkActive, toggleMark } from '../../SlateTools/slateFunction'
import { Element } from '../../SlateTools/element'
import { LIST_TYPES, TEXT_ALIGN_TYPES } from '../../Utils/Types'
import styles from "../../Styles/Editor.module.css"
import axios from 'axios'
import { useGlobalContext } from '../../Context/context'
import { io } from "socket.io-client"
import {LiaMousePointerSolid} from "react-icons/lia"


  let timer = null;
  let delay = 1000;

export default function TextEditor({ value, paramId}){
  const  {state} = useGlobalContext();
  const [socket, setSocket] = useState()
  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => { return <Leaf {...props} />}, [])
  const initialValue = JSON.parse(value.Data);
  const [slateValue, setSlateValue]= useState(initialValue);
  const [mousePositionUser, SetmousePositionUser] = useState({
    username:"" ,
    mousePosition: {
      x: 0,
      y: 0
    }
  })

  // useEffect(() => {
  //   const s = io("http://localhost:4000")
  //   setSocket(s)
  //   return () => {
  //     s.disconnect()
  //   }
  // }, [])


  // useEffect(()=>{
  //   if(socket == null || paramId==null){
  //       return
  //   }else{
  //     console.log(socket, "Hello socket")
  //     socket.emit("get-document", paramId)

  //     window.addEventListener('mousemove', (e)=>{
  //       // console.log(e.clientX, e.clientY, "hello")
  //       const user ={
  //         username: state.Username,
  //         mousePosition: {
  //           x: e.clientX,
  //           y: e.clientY
  //         }
  //       }
  //       socket.emit("User", user)
  //     })
  //   }

  // }, [paramId, socket])

    // useEffect(()=>{
    //   if(socket==null) return

    //   socket.on('send-user-position', (user_position)=>{
    //     console.log(user_position)
    //     SetmousePositionUser(user_position)
    //   })



    // }, [socket])

  const saveData = async() =>{
    const data = JSON.stringify(editor.children)
   await axios.post(`/api/docs/update/${paramId}`,{data: data}).then((result)=>{}).catch((err)=>{})}


  const changeHandler = () =>{
    clearTimeout(timer);
    timer = setTimeout(saveData, delay);
  }




  return (
    <div className={styles.editorContainer}>
      <Slate editor={editor} initialValue={initialValue} 
      >
      <Tools changeHandler={changeHandler} paramId={paramId} Editor={Editor} editor={editor} MarkActive={MarkActive} isMarkActive={isMarkActive} toggleMark={toggleMark} isBlockActive={isBlockActive} toggleBlock={toggleBlock} TEXT_ALIGN_TYPES={TEXT_ALIGN_TYPES} LIST_TYPES={LIST_TYPES} />
      <div className={styles.editorTextContainer}>
      <Editable
          className={styles.editorText}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck 
          onKeyDown={changeHandler}
          autoFocus
         />
      </div>
      </Slate> 
      { mousePositionUser.username &&

        <div className={styles.userIconConatiner} 
  style={{
    position:'absolute', 
    top: `${mousePositionUser.mousePosition.y}px`, 
    left:`${mousePositionUser.mousePosition.x}px`
  }}
>
  <LiaMousePointerSolid className={styles.userIcon} />
  <span>{mousePositionUser.username}</span>
</div>

      }
    </div>
  )
}
