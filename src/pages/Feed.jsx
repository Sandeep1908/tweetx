import React from 'react'
import PostCard from '../components/PostCard'

function Feed() {
  return (
    <div className='w-full h-full pt-40'>

            <section className=' max-w-2xl h-full m-auto'>

                <div>
                        <div>
                        <button   className={` pr-10 pl-10 p-3 rounded-lg text-white bg-[#FF758E]`}>Write</button>
                        </div>

                        <div className='w-full h-full flex flex-col space-y-5 mt-10'>

                            <PostCard
                                name={"Arjun Reddy"}
                                content={"Please note that this example uses inline JavaScript for simplicity. In a real-world application, you might want to use a more sophisticated JavaScript setup, possibly including a framework like React or Vue.js, depending on your project requirements."}
                                time={"10 mins ago"}
                            />
                                <PostCard
                                name={"Arjun Reddy"}
                                content={"Please note that this example uses inline JavaScript for simplicity. In a real-world application, you might want to use a more sophisticated JavaScript setup, possibly including a framework like React or Vue.js, depending on your project requirements."}
                                time={"10 mins ago"}
                            />

<PostCard
                                name={"Arjun Reddy"}
                                content={"Please note that this example uses inline JavaScript for simplicity. In a real-world application, you might want to use a more sophisticated JavaScript setup, possibly including a framework like React or Vue.js, depending on your project requirements."}
                                time={"10 mins ago"}
                            />

<PostCard
                                name={"Arjun Reddy"}
                                content={"Please note that this example uses inline JavaScript for simplicity. In a real-world application, you might want to use a more sophisticated JavaScript setup, possibly including a framework like React or Vue.js, depending on your project requirements."}
                                time={"10 mins ago"}
                            />

<PostCard
                                name={"Arjun Reddy"}
                                content={"Please note that this example uses inline JavaScript for simplicity. In a real-world application, you might want to use a more sophisticated JavaScript setup, possibly including a framework like React or Vue.js, depending on your project requirements."}
                                time={"10 mins ago"}
                            />





                        </div>
                </div>

            </section>
    </div>
  )

}

export default Feed