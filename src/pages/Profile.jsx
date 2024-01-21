import React, { useState, useEffect } from "react";
import AllPosts from "../components/AllPosts";
import Followers from "../components/Followers";
import Following from "../components/Following";
import supabase from "../supabase/supabase";
import { useLocation } from "react-router-dom";

function Profile() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [user, setUser] = useState(null);
  const [currentFollowerCount, setCurrentFollowerCount] = useState(0);
  const [currentFollowingCount, setCurrentFollowingCount] = useState(0);
  const [currentPostCount, setCurrentPostCount] = useState(0);
 
  useEffect(() => {
 
    const fetchUser = async () => {
      const {data} =  await supabase.auth.getSession();
      setUser(data?.session?.user);
    };

    fetchUser();
  }, []);

  useEffect(()=>{

    //fetching all follower count of user
    const fetchCurrentFollowerCount = async () => {
      try {
        const { data, error } = await supabase
          .from("followers")
          .select("follower_id") 
          .eq("followee_id", user?.id);

        if (!error) {
          setCurrentFollowerCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching current follower count", error);
      }
    };


 //fetching all following count of user
    const fetchCurrentFollowingCount = async () => {
      try {
        const { data, error } = await supabase
          .from("followers")
          .select("followee_id")
          .eq("follower_id", user?.id);

        if (!error) {
          setCurrentFollowingCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching current following count", error);
      }
    };

     //fetching all current  post of user
    const fetchCurrentPostCount = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("user_id", user?.id);

        if (!error) {
          setCurrentPostCount(data.length);
        }
      } catch (error) {
        console.error("Error fetching current following count", error);
      }
    }; 
    if (user?.id) {
      fetchCurrentFollowerCount();
    fetchCurrentFollowingCount();
    fetchCurrentPostCount();
    }


  },[user])
    
 

  const itemList = [
    {
      title: "Post",
      content: <AllPosts />,
    },
    {
      title: "Followers",
      content: <Followers />,
    },
    {
      title: "Following",
      content: <Following />,
    },
  ];

  return (
    <div className="w-full h-full pt-32">
      <section className=" max-w-2xl h-full m-auto">
        <div className="w-full">
          <div className="w-full flex justify-start space-x-10 items-end">
            <div className="w-32 h-32 rounded-full border border-slate-400"></div>
            <div className="flex flex-col space-y-10 items-center justify-center">
              <div>
                <h1 className="text-4xl text-slate-400 font-semibold">
                  {user?.user_metadata?.username}
                </h1>
              </div>
              <div className="w-full flex space-x-5">
                <p className="text-slate-500 text-sm">
                  Post: {currentPostCount}
                </p>
                <p className="text-slate-500 text-sm">
                  Followers: {currentFollowerCount}
                </p>
                <p className="text-slate-500 text-sm">
                  Followings: {currentFollowingCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pt-32">
          <div className="w-full  ">
            <ul className="flex justify-evenly w-full relative before:absolute before:top-[-10px] before:bg-slate-400 before:w-full before:h-[1px]">
              {itemList?.map((item, idx) => {
                return (
                  <li
                    onClick={() => setCurrentIndex(idx)}
                    key={idx}
                    className={`text-sm text-slate-400 cursor-pointer  ${
                      currentIndex === idx
                        ? "text-slate-600 relative before:absolute before:top-[-10px] before:w-full before:h-0.5 before:bg-slate-600 "
                        : "text-slate-400"
                    }`}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-full pt-30">
            {itemList?.map((item, idx) => {
              if (currentIndex === idx) {
                return  item.content;
              }
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
