import React, {useEffect} from 'react'
import NavBar from '../Components/HomePageComponent/NavBar'
import DocCreate from '../Components/HomePageComponent/DocCreate'
import AllDoc from '../Components/HomePageComponent/AllDoc'
import axios from "axios"
import { useGlobalContext } from '../Context/context'
import { useNavigate } from 'react-router-dom'
export default function HomePage(){
  const  {state, dispatch} = useGlobalContext();
  const getUserData = async()=>{
    console.log(state)
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });

    try {
      const res = await instance.get("/api/auth/login/success");
      if(res?.data?.user){
        const user = res.data.user;
        console.log(user)
          dispatch({type: 'GET_USER',  payload: user })
      }else{
        useNavigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => { 
    getUserData();
  }, []);


  return ( 
    <div>
        { state?._id && 
          <>
        <NavBar Image={state.Image}/>  
        <DocCreate userId={state._id}/>
        <AllDoc userId={state._id}/>
        </>
        }
    </div>
  )
}
