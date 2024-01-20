import supabase from "../supabase/supabase";


const getUserId=async ()=>{
    
    const {data:{user}}= await supabase.auth.getUser()
    return user?.id
   
}

export default getUserId;