import React from 'react'
import { useState,useEffect } from 'react';
import supabase from '../supabase/supabase';
import getUserId from '../utils/getUserId';
function Followers() {
  const [user, setUser] = useState(null);
  const [follower,setFollower]=useState([])
  const [currentUserId, setCurrentUserId] = useState(null);
  const [followStates, setFollowStates] = useState({});
  const [followerCounts, setFollowerCounts] = useState({});
  
   
  useEffect(() => {
 
    const fetchUser = async () => {
      const {data} =  await supabase.auth.getSession();
      setUser(data?.session?.user);
    };

    fetchUser();
  }, []);



  useEffect(() => {

    const fetchFollowData = async () => {
      try {
        const followData = await supabase
          .from("followers")
          .select("followee_id, follower_id");

        const followStatesMap = {};
        const followerCountsMap = {};

        for (const followEntry of followData.data) {
          const { followee_id, follower_id } = followEntry;

          // Set follow state
          followStatesMap[followee_id] = {
            ...followStatesMap[followee_id],
            [follower_id]: true,
          };

          // Increment follower count
          followerCountsMap[followee_id] = (followerCountsMap[followee_id] || 0) + 1;
        }

        setFollowStates(followStatesMap);
        setFollowerCounts(followerCountsMap);
      } catch (error) {
        console.error("Error fetching follow data", error);
      }
    };

    const fetchCurrentUserId = async () => {
      setCurrentUserId(await getUserId());
    };

    
    fetchFollowData();
    fetchCurrentUserId();
  }, []);

  const handleFollow = async (followeeId) => {
    try {
      await supabase.from("followers").upsert([
        {
          follower_id: currentUserId,
          followee_id: followeeId,
        },
      ]);

      // Update follow state and follower count
      setFollowStates((prevFollowStates) => ({
        ...prevFollowStates,
        [followeeId]: { ...prevFollowStates[followeeId], [currentUserId]: true },
      }));

      setFollowerCounts((prevFollowerCounts) => ({
        ...prevFollowerCounts,
        [followeeId]: (prevFollowerCounts[followeeId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Error during follow operation:", error);
    }
  };

  const handleUnfollow = async (followeeId) => {
    try {
      await supabase
        .from("followers")
        .delete()
        .eq("follower_id", currentUserId)
        .eq("followee_id", followeeId);

      // Update follow state and follower count
      setFollowStates((prevFollowStates) => ({
        ...prevFollowStates,
        [followeeId]: { ...prevFollowStates[followeeId], [currentUserId]: false },
      }));

      setFollowerCounts((prevFollowerCounts) => ({
        ...prevFollowerCounts,
        [followeeId]: Math.max((prevFollowerCounts[followeeId] || 0) - 1, 0),
      }));
    } catch (error) {
      console.error("Error during unfollow operation:", error);
    }
  };




  useEffect(()=>{
    const fetchCurrentFollower = async () => {
      try {
        const { data, error } = await supabase
          .from("followers")
          .select("follower_id") 
          .eq("followee_id", user?.id);

        if (!error) {
      
          const followerIds = data?.map((follower) => follower.follower_id);
          
          const {data:followers,error}=await supabase
          .from('users')
          .select('*')
          .in("user_id",followerIds)

          if(!error){
            setFollower(followers)
          }
       }
      } catch (error) {
        console.error("Error fetching current follower count", error);
      }
    };
    
  
    if (user?.id) {
      fetchCurrentFollower();
  
    }


  },[user])

 


  return (

    <div className='w-full flex flex-col space-y-5 mt-10'>

{follower?.map((user, id) => {
          if (currentUserId !== user?.user_id) {
            const isFollowing = followStates[user?.user_id]?.[currentUserId] || false;
            const followerCount = followerCounts[user?.user_id] || 0;

            return (
              <div key={id} className="w-full overflow-hidden bg-white shadow-xl flex justify-between p-5 space-x-4">
                <div className="w-16 h-14 border border-slate-500 rounded-full"> </div>
                <div className="w-full flex justify-between items-center">
                  <div className="flex flex-col justify-start items-start">
                    <h1 className="text-lg font-bold">{user?.name}</h1>
                    <p className="text-xs text-slate-400">Followers: {followerCount}</p>
                  </div>
                  <div className="text-sm text-slate-500 z-10 ">
                    {isFollowing ? (
                      <button className={`border-slate-400 border pr-10 pl-10 p-3 rounded-lg`} onClick={() => handleUnfollow(user?.user_id)}>
                        Following
                      </button>
                    ) : (
                      <button className={`pr-10 pl-10 p-3 rounded-lg text-white bg-[#FF758E]`} onClick={() => handleFollow(user?.user_id)}>
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  
  )
}

export default Followers