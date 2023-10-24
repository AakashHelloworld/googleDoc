import React, {useState,useCallback, useEffect} from 'react'
import { createEditor, Editor,  Transforms } from 'slate'
import { Slate, withReact, Editable } from 'slate-react'
import Tools from '../Tools'
import {MarkActive, Leaf, isMarkActive,toggleMark, Element, toggleBlock,isBlockActive,LIST_TYPES, TEXT_ALIGN_TYPES} from "./index"
import styles from "../../../Styles/Editor.module.css"
import axios from 'axios'
import { io } from "socket.io-client"

  let timer = null;
  let delay = 1000;

export default function TextEditor({ value, paramId}){
  const [socket, setSocket] = useState()
  const [editor, setEditor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => { return <Leaf {...props} />}, [])
  const initialValue = JSON.parse(value.Data);
  const [slateValue, setSlateValue]= useState(initialValue);

  useEffect(() => {
    const s = io("http://localhost:4000")
    setSocket(s)
    return () => {
      s.disconnect()
    }
  }, [])



  useEffect(()=>{
    if(socket == null || paramId==null){
        return
    }else{
      console.log(socket, "Hello socket")
      socket.emit("get-document", paramId)
    }
  }, [paramId, socket])


  useEffect(() => {
    if (socket == null || paramId == null) {
      return;
    } else {
      socket.on("receive-changes", (newState) => {
        // Delete all nodes
  
        // Insert new nodes
        Transforms.insertNodes(editor, newState.children, { at: Editor.start(editor, []) });
  
        // Update selection
          Transforms.select(editor, newState.selection);
      });
    }
  }, [socket, editor]);
  




  const saveData = async() =>{
    const data = JSON.stringify(editor.children)
   await axios.post(`/api/docs/update/${paramId}`,{data: data}).then((result)=>{
    }).catch((err)=>{})}


  const changeHandler = () =>{
    clearTimeout(timer);
    timer = setTimeout(saveData, delay);
    socket.emit("send-changes", editor)    
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
    </div>
  )
}
