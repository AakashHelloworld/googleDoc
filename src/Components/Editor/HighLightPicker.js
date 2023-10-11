import React, { useState } from 'react'
import style from '../../Styles/Color.module.css'
import {colors} from "../../Utils/Color"
import {BiHighlight} from "react-icons/bi"
const HighLightPicker = () => {
    const [OnPicker, setOnpicker] = useState(false)
    const colorPickerHandler =()=> setOnpicker(!OnPicker);
    
  return (
    <div>
    {
        OnPicker &&
        <div className={style.ColorContainer}>
                {
                    colors.map((color, index)=>{
                        return (
                        <div key={index} style={{backgroundColor: `${color}`}} className={style.colorBox}></div>)
                    })

                }
        </div>
       

    }
    <div className={style.colorPickerContainer} onClick={colorPickerHandler}>
            <span className={style.colorPickerText}><BiHighlight/></span>
            <span className={style.colorPickerBar}></span>
        </div>
    </div>
    
  )
}

export default HighLightPicker