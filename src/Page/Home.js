import React from 'react'
import style from "../Styles/Home.module.css"
export default function Home(){
    const google = () => {
        console.log("Hello Google")
        window.open("http://localhost:4000/api/auth/google", "_self");
      };

  return (
    <div className={style.homePage}>
            <button className={style.GoogleButton} onClick={google}>
                <div className={style.GoogleButtonContainer}><img src='https://freepngimg.com/save/66274-school-google-pearl-button-up-sign-middle/1600x1600'/>
                <span>Login with google</span>
                </div>
            </button>
    </div>
  )
}
