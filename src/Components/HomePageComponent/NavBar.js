import React from 'react'
import style from "../../Styles/Doc.module.css"
import {BsSearch} from "react-icons/bs"
export default function NavBar({Image}) {
  const google = () => {
    console.log("Hello Google")
    window.open("http://localhost:4000/api/auth/google", "_self");
  };

  return (
    <div className={style.HomeNavbar}>
  <div className={style.LogoContainer}>
    <img src='https://cdn-icons-png.flaticon.com/512/5968/5968517.png' />
    { Image &&
    <span>Docs</span>
    }
    {
      !Image && <span>Google Docs</span>
    }
    { !Image &&
    <div className={style.tileContainer} style={{justifyContent:'center',alignItems:'center', gap:'1rem', marginLeft:'4rem'}}>
  <span style={{fontSize:'1.3rem', color:'gray', cursor:"pointer"}}>Overview</span>
  <span style={{fontSize:'1.3rem', color:'gray', cursor:"pointer"}}>Features</span>
  <span style={{fontSize:'1.3rem', color:'gray', cursor:"pointer"}}>Services</span>
  </div>
    }
  </div>

  { Image &&
  <div className={style.SearchContainer}>
  <BsSearch className={style.SearchIcon}/>
  <input type="search" id="gsearch" name="gsearch" placeho
  lder='Search'></input>
  </div>
  }
  <div className={style.userConatiner}>
  { Image &&
      <img src={Image}/>
  }
  </div>  
  { !Image &&
  <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:'1rem', marginRight:'1rem'}}>
    <button className={style.button} onClick={google} style={{cursor:'pointer', backgroundColor:'transparent', border:'none', border:'2px solid #dadce0', padding:'1rem 2rem', borderRadius:'.5rem', color:'#1a73e8', fontSize:'1.3rem'}}>Go to Docs</button>

  </div>  
  }
    </div>
  )
}
