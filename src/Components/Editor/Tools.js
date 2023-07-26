import React from 'react'
import {Editor} from 'slate'

export default function Tools({ editor, MarkActive}){
    const clickHandler = (e) =>{
        e.preventDefault();
        if(MarkActive[`${e.target.value}`].active ==  false){
            Editor.addMark(editor, `${e.target.value}`, true)
            MarkActive[`${e.target.value}`].active = true
           }else{
            Editor.removeMark(editor, `${e.target.value}`, true)
            MarkActive[`${e.target.value}`].active = false
           }
    }
  
  return (
    <div>
        <button value="bold" onClick={clickHandler}>Bold</button>
        <button value="italic" onClick={clickHandler}>Italic</button>
        <button value="underline" onClick={clickHandler}>underline</button>
        <button value="Inline_left" onClick={clickHandler}>Inline Left</button>
        <button value="Inline_right" onClick={clickHandler}>Inline Right</button>
        <button value="Inline_center" onClick={clickHandler}>Inline Center</button>
    </div>
  )
}
