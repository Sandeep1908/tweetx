import React, { useState } from 'react'

function Header() {

    const header=['Feed','Users','Profile']
    const [currentIndex,setCurrentIndex]=useState(0)

    const handleClickHeader=(idx)=>{
        setCurrentIndex(idx)
    }   

  return (
    <div className='w-full h-20 bg-white shadow-lg   '>
        <div className='max-w-7xl h-full  m-auto flex justify-between items-center'>

   
        <div className='w-full flex justify-start items-center'>
         <h1 className="text-4xl text-[#FF758E] font-bold">TweetX</h1>
        </div>

        <div className='w-full'>
            <ul className='w-full flex justify-evenly'>
            {header?.map((item,idx)=>{
                return(
                    <li onClick={()=>handleClickHeader(idx)} className={`text-xl ${currentIndex===idx?'text-[#ff758e]':'text-slate-500 '} cursor-pointer` }>{item}</li>
                )
            })}
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Header