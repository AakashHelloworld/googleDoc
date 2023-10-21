import React from 'react'
import NavBar from '../Components/HomePageComponent/NavBar'
import DocCreate from '../Components/HomePageComponent/DocCreate'
import AllDoc from '../Components/HomePageComponent/AllDoc'

export default function HomePage(){

  return (
    <div>
        <NavBar/>
        <DocCreate/>
        <AllDoc/>
    </div>
  )
}
