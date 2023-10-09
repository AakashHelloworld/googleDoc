import React, {useState,useCallback} from 'react'
import { createEditor, Editor } from 'slate'
import { Slate, withReact, Editable } from 'slate-react'
import Tools from '../Tools'
import {initialValue, MarkActive, Leaf, isMarkActive,toggleMark, Element, toggleBlock,isBlockActive,LIST_TYPES, TEXT_ALIGN_TYPES} from "./index"
import styles from "../../../Styles/Editor.module.css"



export default function TextEditor(){

  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => { return <Leaf {...props} />}, [])
  

  return (
    <div className={styles.editorContainer}>
      <Slate editor={editor} initialValue={initialValue} >
      <Tools Editor={Editor} editor={editor} MarkActive={MarkActive} isMarkActive={isMarkActive} toggleMark={toggleMark} isBlockActive={isBlockActive} toggleBlock={toggleBlock} TEXT_ALIGN_TYPES={TEXT_ALIGN_TYPES} LIST_TYPES={LIST_TYPES} />
      <div className={styles.editorTextContainer}>
      <Editable
          className={styles.editorText}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
         />
      </div>
      </Slate>
    </div>
  )
}
