import React from 'react'

function Following() {
  return (
    <div className='w-full  overflow-hidden bg-white shadow-xl flex justify-between p-5 space-x-4  '>
    <div className='w-16 h-14 border border-slate-500 rounded-full'> </div>
    <div className='w-full flex   justify-between items-center'>

        <div className='flex flex-col justify-start items-start'>
        <h1 className='text-lg font-bold'>Arjun Reddy</h1>
        <p className='text-xs text-slate-400'>Followers:200</p>
        </div>
 


        <div className='text-sm text-slate-500 z-10 '>
        <button  className={`border-slate-400 border pr-16 pl-16 p-3 rounded-lg`}>Following</button>
    </div>
    </div>




</div>
  )
}

export default Following