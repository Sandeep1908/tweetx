import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import supabase from '../supabase/supabase'
function Header() {

    const header=['Feed','Users','Profile']
    const [currentIndex,setCurrentIndex]=useState(0)
    const [session,setSession]=useState(null)
    
    
    const handleClickHeader=(idx)=>{
        setCurrentIndex(idx)
    }   
    const pathname=useLocation().pathname
    useEffect(()=>{
        supabase.auth.onAuthStateChange((_,_session)=>{

          setSession(_session?.access_token)
        })
      


      },[])

      const isHidden= pathname==='/login' || pathname==='/signup'
    
  return (
    <div className={`w-full h-20 bg-white shadow-lg  ${isHidden?'hidden':'block' } `}>
        <div className='max-w-7xl h-full  m-auto flex justify-between items-center'>

   
        <div className='w-full flex justify-start items-center'>
         <h1 className="text-4xl text-[#FF758E] font-bold">TweetX</h1>
        </div>

        <div className='w-full'>
            <ul className='w-full flex justify-evenly'>
            {header?.map((item,idx)=>{
                return(
                    <Link to={`/${item}`} onClick={()=>handleClickHeader(idx)} className={`text-xl ${currentIndex===idx?'text-[#ff758e]':'text-slate-500 '} cursor-pointer` }>{item}</Link>
                )
            })}
            {session? <button   className={` pr-5 pl-5 p-2 rounded-lg text-white bg-[#FF758E]`} onClick={()=>supabase.auth.signOut()}>Log out</button>:''}
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Header