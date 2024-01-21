import React, { useEffect, useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import Header from '../components/Header'
import Feed from './Feed'
import Profile from './Profile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import supabase from '../supabase/supabase'
function Main() {
  const [session,setSession]=useState(null)
  const pathname=useLocation().pathname
  const navigate=useNavigate()
  const isHidden= pathname==='/login' || pathname==='/signup'

    // checking if user is authenticated
  useEffect(()=>{
    supabase.auth.onAuthStateChange((auth,_session)=>{
      if(!isHidden && !_session){
        navigate('/signup')
      }
    })
  },[])


  return (
    <div className='w-full h-full'>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Main