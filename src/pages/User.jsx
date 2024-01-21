import React, { useEffect, useState } from "react";
import supabase from "../supabase/supabase";
import getUserId from "../utils/getUserId";

function User() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [followStates, setFollowStates] = useState({});
  const [followerCounts, setFollowerCounts] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");

        if (error) {
          return alert("Error fetching users", error.message);
        }

        setUsers(data);
      } catch (error) { 
        console.error("Error fetching users", error);
      }
    };


    //fetching  all followers
    
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

    fetchUsers();
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

 

  return (
    <div className="w-full h-full pt-32">
      <section className="max-w-2xl  flex  flex-col  space-y-4 h-full m-auto">
        {users?.map((user, id) => {
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
      </section>
    </div>
  );
}

export default User;
