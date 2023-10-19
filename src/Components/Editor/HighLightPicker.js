import React, { useState } from 'react'
import style from '../../Styles/Color.module.css'
import {colors} from "../../Utils/Color"
import {BiHighlight} from "react-icons/bi"
const HighLightPicker = () => {
    const [OnPicker, setOnpicker] = useState(false)
    const [selectColor, setSelectColor] = useState(colors[0])
    const colorPickerHandler =()=> setOnpicker(!OnPicker);
    const colorSelectHandler = (e)=>{
        console.log(e.target.id)
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
                        <div key={index} onClick={(e)=>colorSelectHandler(e)} style={{backgroundColor: `${color}`}} id={color} className={style.colorBox}></div>)
                    })

                }
        </div>
       

    }
    <div className={style.colorPickerContainer} onClick={colorPickerHandler}>
            <span style={{color:`${selectColor}`}} className={style.colorPickerText}><BiHighlight/></span>
            <span style={{backgroundColor:`${selectColor}`}}  className={style.colorPickerBar}></span>
        </div>
    </div>
    
  )
}

export default HighLightPicker