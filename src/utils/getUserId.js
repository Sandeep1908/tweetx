import supabase from '../supabase/supabase.js'

// getting user Id
const getUserId=async ()=>{
    var id
   await supabase.auth.getUser()
    .then((data)=>{
        id=data?.data?.user?.id
    })

    return id;
}

export default getUserId

