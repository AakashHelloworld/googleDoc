import React, { useState } from 'react'
import style from '../../Styles/Color.module.css'
import {colors} from "../../Utils/Color"
import { Editor, Transforms,Element as SlateElement} from 'slate'
import { useSlate } from 'slate-react'
const ColorPicker = () => {
    const editor = useSlate();
    const formate = 'color';
    const [OnPicker, setOnpicker] = useState(false)
    const [selectColor, setSelectColor] = useState(colors[0])
    const colorPickerHandler =()=> setOnpicker(!OnPicker);
    const colorSelectHandler = (e)=>{
        console.log(e.target.id)
        // selectColor && Transforms.select(editor,selectColor)
        // Editor.addMark(editor,formate,e.target.id);
        
        setSelectColor(e.target.id)
        setOnpicker(false)    
    }



    
  return (
    <div>
    {
        OnPicker &&
        <div className={style.ColorContainer}>
                {
                    colors.map((color, index)=>{
                        return (
                        <div onClick={(e)=>colorSelectHandler(e)} key={index} style={{backgroundColor: `${color}`}} id={color} className={style.colorBox}></div>)
                    })

                }
        </div>
       

    }
    <div className={style.colorPickerContainer} onClick={colorPickerHandler}>
            <span style={{color:`${selectColor}`}} className={style.colorPickerText}>A</span>
            <span style={{backgroundColor:`${selectColor}`}} className={style.colorPickerBar}></span>
        </div>
    </div>
    
  )
}

export default ColorPicker