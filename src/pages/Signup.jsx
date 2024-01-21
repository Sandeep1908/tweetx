import React, { useEffect, useState } from "react";
import supabase from '../supabase/supabase.js'
import { useNavigate } from "react-router-dom";
 

function Signup() {

  const navigate=useNavigate()
  const [inputValues,setInputValues]=useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setInputValues((prev)=>({
      ...prev,
      [name]:value
    }))
  }

   
  //handle signup

  const handleSignup=async()=>{
    const {name,email,password,confirmPassword}=inputValues
    if(password !== confirmPassword)return alert("password doesn't matched")
    if(!email)return alert('email is required')

    const {data,error}= await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          username:name
        }
      }
    })

    if(error){
      return alert(error.message)
    }
    
    supabase.from('users')
    .insert(
      [
        {
          user_id:data?.user?.id,
          name:data?.user?.user_metadata?.username
        }
      ]
    )
    .then((data)=>{
      
      if(data?.error){
        return alert('ERRR in signUP user')
      }
      alert('User Sign up Success')
    navigate('/login')
    })
    
  }

  
  return (
    <div className="w-full h-full">
      <div className="max-w-7xl h-full m-auto flex justify-center items-center">


        <div className="w-full h-full flex flex-col  justify-around p-10 space-y-28 ">

          <div className="flex flex-col justify-center items-start space-y-5">
            <h1 className="text-4xl text-[#FF758E] font-bold">TweetX</h1>
            <button  className={`border-slate-400 border pr-16 pl-16 p-3 rounded-lg`} onClick={()=>navigate('/login')}>Login</button>
          </div>

            <div className="w-full h-full flex flex-col space-y-24">
                  <div className="w-full">
                    <h1 className="text-4xl text-slate-500 font-bold tracking-wide">Create Account</h1>
                  </div>

                  <div className="max-w-96 flex flex-col space-y-5 items-start">
                      <div className="w-full">
                        <input type="text" placeholder="Name" className="bg-[#F9F9F9] p-5 rounded-md w-full outline-none  " name="name" value={inputValues.name} onChange={handleInputChange}/>
                      </div>

                      <div className="w-full">
                        <input type="text" placeholder="Email" className="bg-[#F9F9F9] p-5 rounded-md w-full outline-none " name="email" value={inputValues.email} onChange={handleInputChange}/>
                      </div>

                      <div className="w-full">
                        <input type="password" placeholder="Password" className="bg-[#F9F9F9] p-5 rounded-md w-full outline-none " name='password' value={inputValues.password} onChange={handleInputChange}/>
                      </div>

                      <div className="w-full">
                        <input type="password" placeholder="Confirm Password" className="bg-[#F9F9F9] p-5 rounded-md w-full outline-none " name="confirmPassword" value={inputValues.confirmPassword} onChange={handleInputChange}/>
                      </div>

                      <div className="w-full flex justify-end">
                      <button onClick={handleSignup}   className={` pr-10 pl-10 p-3 rounded-lg text-white bg-[#FF758E]`}>Sign Up</button>
                      </div>
                  </div>
            </div>


        </div>

          <img className="hidden md:block" src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg" alt="" />


      </div>
    </div>
  );
}

export default Signup;
