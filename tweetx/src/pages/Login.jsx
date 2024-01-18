import React from 'react'

function Login() {
  return (
    <div className="w-full h-full">
    <div className="max-w-7xl h-full m-auto flex justify-center items-center">


      <div className="w-full h-full flex flex-col  justify-around p-10 space-y-28 ">

        <div className="flex flex-col justify-center items-start space-y-5">
          <h1 className="text-4xl text-[#FF758E] font-bold">TweetX</h1>
          <button  className={`border-slate-400 border pr-16 pl-16 p-3 rounded-lg`}>Create Account</button>
        </div>

          <div className="w-full h-full flex flex-col space-y-24">
                <div className="w-full">
                  <h1 className="text-4xl text-slate-500 font-bold tracking-wide">Login</h1>
                </div>

                <div className="max-w-96 flex flex-col space-y-5 items-start">
                  

                    <div className="w-full">
                      <input type="text" placeholder="Email" className="bg-[#F9F9F9] p-5 rounded-md w-full outline-none "/>
                    </div>

                    <div className="w-full">
                      <input type="text" placeholder="Password" className="bg-[#F9F9F9] p-5 rounded-md w-full outline-none "/>
                    </div>

                    

                    <div className="w-full flex justify-end">
                    <button   className={` pr-10 pl-10 p-3 rounded-lg text-white bg-[#FF758E]`}>Login</button>
                    </div>
                </div>
          </div>


      </div>

        <img className="hidden md:block" src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg" alt="" />


    </div>
  </div>
  )
}

export default Login