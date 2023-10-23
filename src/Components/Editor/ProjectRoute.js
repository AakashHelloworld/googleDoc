import React, { useEffect, useState } from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "axios"
import { useGlobalContext } from '../../Context/context'

let UserInformation={};
const ProjectRoute = () => {
    const  {state, dispatch} = useGlobalContext();
    const [loginProcess, setLoginProcess] = useState(false);
    const location = useLocation();


    useEffect(()=>{
        
        const loginCheck = async()=>{
            const instance = axios.create({
                withCredentials: true,
                headers: { authorization: "Bearer" },
              });
        try {
            const res = await instance.get("/api/auth/login/success");
            if(res?.data?.user){
              const user = res.data.user;
              console.log(user)
              UserInformation = res.data.user;
                dispatch({type: 'GET_USER',  payload: user }) 
                setLoginProcess(true)
            }
          } catch (err) {
            console.log(err);
            setLoginProcess(true)
          } 
        }
    loginCheck();
    }, [])

  return (
    <>
    {loginProcess &&
    <>
{
    UserInformation._id?<Outlet />:(<Navigate to="/" state={{ from: location }} replace />)
}
    </>
    }
    </>

  )
}

export default ProjectRoute