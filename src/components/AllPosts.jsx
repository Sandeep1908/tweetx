import React, { useState } from "react";
import supabase from "../supabase/supabase";
import { useEffect } from "react";
import calculateTimeDifference from "../utils/getTime";
function AllPosts({currentIndex}) {
  const [currentPost, setCurrentPost] = useState([]);
 
  const [user, setUser] = useState();

  useEffect(() => {
 
    const fetchUser = async () => {
      const {data} =  await supabase.auth.getSession();
      setUser(data?.session?.user);
    };

    fetchUser();
  }, []);

  //fetching all post of logged in user

  useEffect(() => {
   
    const fetchCurrentPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user?.id);

        if (!error) {
          setCurrentPost(data?.sort((a,b)=>new Date(b?.created_at)- new Date(a?.created_at)));
        }
      } catch (error) {
        console.error("Error fetching current post", error);
      }
    };

  
    if (user?.id) {
      fetchCurrentPost();
    }
  }, [user]);
  return (
    <div className="w-full flex flex-col space-y-5"> 
      {currentPost?.map((post, idx) => {
        return (
          <div key={idx} className="w-full  overflow-hidden bg-white shadow-xl flex justify-between p-5 space-x-4 relative before:w-16 before:h-16 before:bg-[#FF758E] before:right-[-40px] before:top-10  before:absolute before:rounded-full ">
            <div className="w-[5rem] h-14 border border-slate-500 rounded-full">
              {" "}
            </div>
            <div className="w-full flex flex-col justify-start items-start">
              <h1 className="text-lg font-bold">{user?.user_metadata?.username}</h1>
              <p className="text-sm text-slate-500">
               {post?.content}
              </p>
            </div>
            <div className="text-sm text-slate-500 z-10 ">{calculateTimeDifference(post?.created_at)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AllPosts;
