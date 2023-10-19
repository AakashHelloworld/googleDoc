import React from 'react'
import {Editor} from 'slate'
import {useSlate } from 'slate-react'
import Button from '../Form/Button';
import {AiOutlineBold,AiOutlineItalic,AiOutlineUnderline} from "react-icons/ai"
import {insertImage, isImageUrl} from "./TextEditor/index"
import {BsTextCenter,BsTextRight, BsTextLeft,BsImage } from "react-icons/bs"
import {VscListOrdered, VscListUnordered} from "react-icons/vsc"
import {LuHeading1, LuHeading2} from "react-icons/lu"

import style from "../../Styles/Editor.module.css"

import {CiTextAlignJustify} from "react-icons/ci"

import ColorPicker from './ColorPicker';

import HighLightPicker from './HighLightPicker';




export default function Tools({ editor, MarkActive,isMarkActive,toggleMark,isBlockActive,toggleBlock ,LIST_TYPES, TEXT_ALIGN_TYPES}){
  const buttonEditor = useSlate()

  
  const blockclickhandler = (e) =>{
      e.preventDefault();
      toggleBlock(buttonEditor, `${e.currentTarget.value}`)
  }
  const clickHandler = (e) => {
    e.preventDefault();
    toggleMark(buttonEditor,`${e.currentTarget.value}`)
  };

  const imageclickhandler = (e)=>{
    e.preventDefault();
    const url = window.prompt('Enter the URL of the image:')
    // console.log(url)
    console.log(isImageUrl(url))
    // if (!isImageUrl(url)) {
    //   alert('URL is not an image')
    //   return
    // }
     insertImage(editor, url)

  }
  
  return (
    <div className={style.toolContainer}>
    <Button
     active={isMarkActive(buttonEditor, "bold" )}
     value={"bold"} clickHandler={clickHandler}>
      <AiOutlineBold className={`${isMarkActive(buttonEditor, "bold" )?'active_icon':'inactive_icon'}`}/>
    </Button>

    <Button
     active={isMarkActive(buttonEditor, "italic" )}
     value={"italic"} clickHandler={clickHandler}>
      <AiOutlineItalic className={isMarkActive(buttonEditor, "italic" )?'active_icon':'inactive_icon'} />
    </Button>

    <Button
     active={isMarkActive(buttonEditor, "underline" )}
     value={"underline"} clickHandler={clickHandler}>
    <AiOutlineUnderline className={isMarkActive(buttonEditor, "underline" )?'active_icon':'inactive_icon'} />
    </Button>



    <Button
    active={isBlockActive(editor, 'heading_one', TEXT_ALIGN_TYPES.includes('heading_one') ? 'align' : 'type' )}
    value={"heading_one"}
    clickHandler={blockclickhandler}
    >
    <LuHeading1 className={isMarkActive(buttonEditor, "italic" )?'active_icon':'inactive_icon'} />
    </Button>

    <Button
    active={isBlockActive(editor, 'heading_two', TEXT_ALIGN_TYPES.includes('heading_two') ? 'align' : 'type' )}
    value={"heading_two"}
    clickHandler={blockclickhandler}

    >
    <LuHeading2 className={isMarkActive(buttonEditor, "italic" )?'active_icon':'inactive_icon'} />

    </Button>

    <Button
    active={isBlockActive(editor, 'number_list', TEXT_ALIGN_TYPES.includes('numbered_list') ? 'align' : 'type' )}
    value={"numbered_list"}
    clickHandler={blockclickhandler}
    >
    <VscListOrdered className={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )?'active_icon':'inactive_icon'} />
    </Button>

    <Button

    active={isBlockActive(editor, 'bulleted_list', TEXT_ALIGN_TYPES.includes('bulleted_list') ? 'align' : 'type' )}
    value={"bulleted_list"}
    clickHandler={blockclickhandler}
    >
      <VscListUnordered className={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )?'active_icon':'inactive_icon'} />
    </Button>


    <Button

active={isBlockActive(editor, 'left', TEXT_ALIGN_TYPES.includes('bulleted_list') ? 'align' : 'type' )}
value={"left"}
clickHandler={blockclickhandler}
>
  <BsTextLeft

className={isBlockActive(editor, 'left', TEXT_ALIGN_TYPES.includes('left') ? 'align' : 'type' )?'active_icon':'inactive_icon'}
  />
</Button>
    <Button

active={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )}
value={"center"}
clickHandler={blockclickhandler}
>
  <BsTextCenter

className={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )?'active_icon':'inactive_icon'}
  />
</Button>
    <Button

active={isBlockActive(editor, 'right', TEXT_ALIGN_TYPES.includes('right') ? 'align' : 'type' )}
value={"right"}
clickHandler={blockclickhandler}
>
  <BsTextRight

  className={isBlockActive(editor, 'right', TEXT_ALIGN_TYPES.includes('right') ? 'align' : 'type' )?'active_icon':'inactive_icon'}


  />
</Button>

<Button
active={isBlockActive(editor, 'justify', TEXT_ALIGN_TYPES.includes('justify') ? 'align' : 'type' )}
value={"justify"}
clickHandler={blockclickhandler}
>
  <CiTextAlignJustify className={isBlockActive(editor, 'justify', TEXT_ALIGN_TYPES.includes('justify') ? 'align' : 'type' )?'active_icon':'inactive_icon'} />
</Button>


<Button clickHandler={imageclickhandler}>
  <BsImage className='active_icon'/>
</Button>

<Button>
<ColorPicker editor={editor} />
</Button>

<Button>
  <HighLightPicker editor={editor}/>
</Button>

    </div>
  )
}
