import React, { useState } from 'react'
import {useSlate } from 'slate-react'
import Button from '../../FormAndModal/Button';
import {AiOutlineBold,AiOutlineItalic,AiOutlineUnderline} from "react-icons/ai"
import {BsTextCenter,BsTextRight, BsTextLeft,BsImage } from "react-icons/bs"
import {VscListOrdered, VscListUnordered} from "react-icons/vsc"
import {LuHeading1, LuHeading2} from "react-icons/lu"
import { insertImage, isImageUrl } from '../../SlateTools/Image';
import style from "../../Styles/Editor.module.css"
import {AiOutlinePlus, AiOutlineEnter} from "react-icons/ai"
import {CiTextAlignJustify} from "react-icons/ci"
import ColorPicker from './ColorPicker';
import Modal from "../../FormAndModal/Modal" 
import axios from "axios"


export default function Tools({changeHandler, editor, paramId, MarkActive,isMarkActive,toggleMark,isBlockActive,toggleBlock ,LIST_TYPES, TEXT_ALIGN_TYPES}){
  const buttonEditor = useSlate()
  const [invitePopup, setInvitePopup] = useState(false)
  const [emails, setEmails] = useState([])
  const [emailText, setEmailText] =useState("");
  const blockclickhandler = (e) =>{
      e.preventDefault();
      toggleBlock(buttonEditor, `${e.currentTarget.value}`)
      changeHandler()
  }
  const clickHandler = (e) => {
    e.preventDefault();
    toggleMark(buttonEditor,`${e.currentTarget.value}`)
    changeHandler()
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
     changeHandler()
  }

  const invitePopUpHandler = () =>{
    setInvitePopup(!invitePopup);
  }

  const emailHandler = (e)=>{
    setEmailText(e.target.value)
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    console.log(emailText)
    console.log(emails)
    setEmails((emails)=>{
      return [...emails, emailText  ]
    })
    setEmailText("")
  }

  const submitAllEmails = (e)=>{
    if(emails.length){
    axios.post(`/api/docs/invite/${paramId}`, emails).then((result)=>{
        console.log(result)
        setInvitePopup(false);
        setEmails([])
    }).catch((err)=>{
      console.log(err)
    })
    }
  }
  
  return (
    <div className={style.toolContainer}>
    <div className={style.toolSubContainer}>
    <Button
     active={isMarkActive(buttonEditor, "bold" )}
     value={"bold"} clickHandler={clickHandler}>
      <AiOutlineBold size={20} className={`${isMarkActive(buttonEditor, "bold" )?'active_icon':'inactive_icon'}`}/>
    </Button>

    <Button
     active={isMarkActive(buttonEditor, "italic" )}
     value={"italic"} clickHandler={clickHandler}>
      <AiOutlineItalic size={20} className={isMarkActive(buttonEditor, "italic" )?'active_icon':'inactive_icon'} />
    </Button>

    <Button
     active={isMarkActive(buttonEditor, "underline" )}
     value={"underline"} clickHandler={clickHandler}>
    <AiOutlineUnderline size={20}  className={isMarkActive(buttonEditor, "underline" )?'active_icon':'inactive_icon'} />
    </Button>



    <Button
    active={isBlockActive(editor, 'heading_one', TEXT_ALIGN_TYPES.includes('heading_one') ? 'align' : 'type' )}
    value={"heading_one"}
    clickHandler={blockclickhandler}
    >
    <LuHeading1 size={20} className={isMarkActive(buttonEditor, "italic" )?'active_icon':'inactive_icon'} />
    </Button>

    <Button
    active={isBlockActive(editor, 'heading_two', TEXT_ALIGN_TYPES.includes('heading_two') ? 'align' : 'type' )}
    value={"heading_two"}
    clickHandler={blockclickhandler}

    >
    <LuHeading2 size={20} className={isMarkActive(buttonEditor, "italic" )?'active_icon':'inactive_icon'} />

    </Button>

    <Button
    active={isBlockActive(editor, 'number_list', TEXT_ALIGN_TYPES.includes('numbered_list') ? 'align' : 'type' )}
    value={"numbered_list"}
    clickHandler={blockclickhandler}
    >
    <VscListOrdered size={20} className={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )?'active_icon':'inactive_icon'} />
    </Button>

    <Button

    active={isBlockActive(editor, 'bulleted_list', TEXT_ALIGN_TYPES.includes('bulleted_list') ? 'align' : 'type' )}
    value={"bulleted_list"}
    clickHandler={blockclickhandler}
    >
      <VscListUnordered size={20} className={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )?'active_icon':'inactive_icon'} />
    </Button>


    <Button

active={isBlockActive(editor, 'left', TEXT_ALIGN_TYPES.includes('bulleted_list') ? 'align' : 'type' )}
value={"left"}
clickHandler={blockclickhandler}
>
  <BsTextLeft size={20}

className={isBlockActive(editor, 'left', TEXT_ALIGN_TYPES.includes('left') ? 'align' : 'type' )?'active_icon':'inactive_icon'}
  />
</Button>
    <Button
  
active={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )}
value={"center"}
clickHandler={blockclickhandler}
>
  <BsTextCenter size={20}

className={isBlockActive(editor, 'center', TEXT_ALIGN_TYPES.includes('center') ? 'align' : 'type' )?'active_icon':'inactive_icon'}
  />
</Button>
    <Button

active={isBlockActive(editor, 'right', TEXT_ALIGN_TYPES.includes('right') ? 'align' : 'type' )}
value={"right"}
clickHandler={blockclickhandler}
>
  <BsTextRight  size={20}

  className={isBlockActive(editor, 'right', TEXT_ALIGN_TYPES.includes('right') ? 'align' : 'type' )?'active_icon':'inactive_icon'}


  />
</Button>

<Button
active={isBlockActive(editor, 'justify', TEXT_ALIGN_TYPES.includes('justify') ? 'align' : 'type' )}
value={"justify"}
clickHandler={blockclickhandler}
>
  <CiTextAlignJustify size={20} className={isBlockActive(editor, 'justify', TEXT_ALIGN_TYPES.includes('justify') ? 'align' : 'type' )?'active_icon':'inactive_icon'} />
</Button>


<Button clickHandler={imageclickhandler}>
  <BsImage className='active_icon'/>
</Button>

<Button>
<ColorPicker editor={editor} />
</Button>

</div>
<div className={style.InviteContainer}>
<button onClick={invitePopUpHandler}>
< AiOutlinePlus className={style.InviteIcon} />
<span>Invite</span>
</button>
      <Modal isOpen={invitePopup}>
            <div className={style.InviteModalContainer}>
              <div className={style.InviteModalSubContainer}>
                <input value={emailText} type='text' onChange={emailHandler}  />
                <button onClick={(e)=>submitHandler(e)} ><AiOutlineEnter className={style.InviteButtonIcon} /></button>
              </div>
              <div className={style.emailCOntainer}>
{

        emails?.map((data)=>{
          return (<div className={style.email}><p >{data}</p></div>)
        })

}
              </div>
              <div>
                <button onClick={()=>setInvitePopup(false)}>Cancel</button>
                <button onClick={submitAllEmails}>Submit</button>

              </div>
            </div>
        
      </Modal>
</div>
    </div>
  )
}
