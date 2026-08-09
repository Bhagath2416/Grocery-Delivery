import axios from "axios";

const api=axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

// Inject JWT token from localStorage into every request
// if token is available in local storage,it will be added in each network request
 api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("auth_token")
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
 })

//  handling the auth error globally
api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_user");
            // Only redirect if not already on auth pages
            // if the user not on login or register
            if(!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")  ){
                window.location.href="/login"
            }
        }
        return Promise.reject(error)
    }
)

export default api;