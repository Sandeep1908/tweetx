import React from 'react'
import Signup from './Signup'
import Login from './Login'
import Header from '../components/Header'
import Feed from './Feed'
function Main() {
  return (
    <div className='w-full h-full'>
      <Header/>
      <Feed/>
        {/* <Signup/> */}
        {/* <Login/> */}
    </div>
  )
}

export default Main