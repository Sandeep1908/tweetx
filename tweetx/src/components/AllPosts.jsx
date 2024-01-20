import React, { useState } from "react";
import supabase from "../supabase/supabase";
import { useEffect } from "react";
function AllPosts({currentIndex}) {
  const [currentPost, setCurrentPost] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    supabase.auth.onAuthStateChange((user, session) => {
      setUser(session?.user);
    });

    const fetchCurrentPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user?.id);

        if (!error) {
          setCurrentPost(data);
        }
      } catch (error) {
        console.error("Error fetching current following count", error);
      }
    };
    fetchCurrentPost()
  }, []);
  return (
    <> 
      {currentPost?.map((post, idx) => {
        console.log(post)
        return (
          <div key={idx} className="w-full  overflow-hidden bg-white shadow-xl flex justify-between p-5 space-x-4 relative before:w-16 before:h-16 before:bg-[#FF758E] before:right-[-40px] before:top-10  before:absolute before:rounded-full ">
            <div className="w-[6rem] h-14 border border-slate-500 rounded-full">
              {" "}
            </div>
            <div className="w-full flex flex-col justify-start items-start">
              <h1 className="text-lg font-bold">{user?.user_metadata?.username}</h1>
              <p className="text-sm text-slate-500">
               {post?.content}
              </p>
            </div>
            <div className="text-sm text-slate-500 z-10 ">{post?.created_at}</div>
          </div>
        );
      })}
    </>
  );
}

export default AllPosts;
