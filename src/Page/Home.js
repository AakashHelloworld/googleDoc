import React from 'react'
import style from "../Styles/Home.module.css"
import NavBar from "../Components/HomePageComponent/NavBar"
import image from "../Image/home.png"
export default function Home(){
    const google = () => {
        console.log("Hello Google")
        window.open("http://localhost:4000/api/auth/google", "_self");
      };

  return (
    <>
    <NavBar />
    <div className={style.homePage}>
        <div className={style.Home}  style={{display:"flex", justifyContent:"center", flexDirection:"column", paddingLeft:"4rem"}}>

        <h1 style={{fontSize:'4rem', lineHeight:'4rem', fontWeight:'400', marginBottom:'1rem'}}>Build your best ideas together, in Google Docs</h1>
        <p style={{fontSize:'1.3rem', lineHeight:'2rem', fontWeight:'400'}}>Create and collaborate on online documents in real-time and from any device.</p>

        <button onClick={google} style={{cursor:'pointer', backgroundColor:'transparent', border:'none', border:'2px solid #dadce0', padding:'1rem 2rem', borderRadius:'.5rem', color:'#1a73e8', fontSize:'1.3rem', width:'fit-content', marginTop:'2rem'}}>Go to Docs</button>
        </div>
        <div className={style.Image} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <img style={{width:"100%", aspectRatio:"4/3"}} src={image} />
        </div>
    </div>
    </>
  )
}
