import React from 'react'

function PostCard({name,content,time}) {
  return (
    
    <div className='w-full  overflow-hidden bg-white shadow-xl flex justify-between p-5 space-x-4 relative before:w-16 before:h-16 before:bg-[#FF758E] before:right-[-40px] before:top-10  before:absolute before:rounded-full '>
    <div className='w-16 h-14 border border-slate-500 rounded-full'> </div>
    <div className='w-full flex flex-col justify-start items-start'>
        <h1 className='text-lg font-bold'>{name}</h1>
        <p className='text-sm text-slate-500'>{content}</p>
    </div>
    <div className='text-sm text-slate-500 z-10 '>
       {time}
    </div>



</div>
  )
}

export default PostCard