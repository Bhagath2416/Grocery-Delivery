import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Loading from "./Loading"


const ProtectedRoute = () => {
  // protect all routes
  const {user,loading} = useAuth()
  if(loading) return <Loading />
  // if user not loggedin and enter too order or payment page it redirected to login page because these are protected routes
  if(!user) return <Navigate to='/login' replace />
  return (
    <Outlet />
  )
}

export default ProtectedRoute