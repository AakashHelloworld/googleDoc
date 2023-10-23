import React, {useState,useCallback, useEffect} from 'react'
import { createEditor, Editor } from 'slate'
import { Slate, withReact, Editable } from 'slate-react'
import Tools from '../Tools'
import {MarkActive, Leaf, isMarkActive,toggleMark, Element, toggleBlock,isBlockActive,LIST_TYPES, TEXT_ALIGN_TYPES} from "./index"
import styles from "../../../Styles/Editor.module.css"
import axios from 'axios'


  let timer = null;
  let delay = 1000;


export default function TextEditor({paramId, value}){
  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => { return <Leaf {...props} />}, [])
  const initialValue = JSON.parse(value.Data);
  const saveData = async() =>{
    const data = JSON.stringify(editor.children)
    
   await axios.post(`/api/docs/update/${paramId}`,{data: data}).then((result)=>{
    }).catch((err)=>{})}


  const changeHandler = () =>{
    clearTimeout(timer);
    timer = setTimeout(saveData, delay);
  }
  return (
    <div className={styles.editorContainer}>
      <Slate editor={editor} initialValue={initialValue} >
      <Tools paramId={paramId} Editor={Editor} editor={editor} MarkActive={MarkActive} isMarkActive={isMarkActive} toggleMark={toggleMark} isBlockActive={isBlockActive} toggleBlock={toggleBlock} TEXT_ALIGN_TYPES={TEXT_ALIGN_TYPES} LIST_TYPES={LIST_TYPES} />
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
