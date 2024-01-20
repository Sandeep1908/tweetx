 import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Main from "./pages/Main"
 import { createBrowserRouter,createRoutesFromElements ,RouterProvider,Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import User from "./pages/User"
function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<Main/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/signup'  element={<Signup/>}/>
        <Route path='/feed'  element={<Feed/>}/>
        <Route path='/profile'  element={<Profile/>}/>
        <Route path='/users'  element={<User/>}/>
       </Route>



    )
  );
  return (
    <>
       <RouterProvider router={router}/>
    </>
  )
}

export default App
