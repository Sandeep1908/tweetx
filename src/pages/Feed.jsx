import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import supabase from "../supabase/supabase";
import calculateTimeDifference from "../utils/getTime";

function Feed() {
  const [user, setUser] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setUser(data?.session?.user);
      }
    };
    fetchUser();
  }, []);


  

  useEffect(() => {

    // fetching all post of loggedIn user
    const fetchFeedPosts = async () => {
      const { data: userPosts, error: userPostError } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user?.id);

      if (userPostError) {
        console.log("ERR in fetching user post");
        return;
      }

      // fetching following of current user
      const { data: followingUsers, error: followingUserError } = await supabase
        .from("followers")
        .select("followee_id")
        .eq("follower_id", user?.id);

      if (followingUserError) {
        console.log("ERRR in fetching following users");
        return;
      }

      const followingIds = followingUsers?.map(
        (follower) => follower?.followee_id
      );

      //fetching  all posts of following user
      const { data: followingUserPosts, error: followingUserPostsError } =
        await supabase.from("posts").select("*").in("user_id", followingIds);

      if (followingUserPostsError) {
        console.log("ERRR in fetching followingUsersPosts");
        return;
      }

      const allPosts = [...userPosts, ...followingUserPosts].sort(
        (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
      );

      setFeedPosts(allPosts);
 
    };

    if (user?.id) {
      fetchFeedPosts();
    }
  }, [user]);

  // Open post modal
  const handleWriteButtonClick = () => {
    setIsWriteModalOpen(true);
  };

  //close Post modal
  const handleModalClose = () => {
    setIsWriteModalOpen(false);
    setNewPostContent("");
  };


  //add post to the database
  const handlePostSubmit = async () => {
    if (!newPostContent) return alert("Please write something");

    const { error } = await supabase.from("posts").insert({
      user_id: user?.id,
      content: newPostContent,
      name: user?.user_metadata?.username,
    });

    if (error) {
      console.log("ERRR in while create a post");
      return;
    }
    handleModalClose();
  };

  return (
    <div className="w-full h-full pt-40">
      <section className=" max-w-2xl h-full m-auto">
        <div>
          <div>
            <button
              onClick={handleWriteButtonClick}
              className={` pr-10 pl-10 p-3 rounded-lg text-white bg-[#FF758E]`}
            >
              Write
            </button>
          </div>

          <div className="w-full h-full flex flex-col space-y-5 mt-10">
            {feedPosts?.map((post, idx) => {
              return (
                <div className="w-full  overflow-hidden bg-white shadow-xl flex justify-between p-5 space-x-4 relative before:w-16 before:h-16 before:bg-[#FF758E] before:right-[-40px] before:top-10  before:absolute before:rounded-full ">
                  <div className="w-[5rem] h-[3.7rem] border border-slate-500 rounded-full">
                    {" "}
                  </div>
                  <div className="w-full flex flex-col justify-start items-start">
                    <h1 className="text-lg font-bold">{post?.name}</h1>
                    <p className="text-sm text-slate-500">{post?.content}</p>
                  </div>
                  <div className="text-sm text-slate-500 z-10 ">
                    {calculateTimeDifference(post?.created_at)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isWriteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write your post..."
              className="w-full h-32 border border-gray-300 p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="mr-4 px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePostSubmit}
                className="px-4 py-2 bg-[#FF758E] rounded-md text-white"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
