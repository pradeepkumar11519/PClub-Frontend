import { useState } from 'react'
import { createContext } from 'react'
import Cookies from 'js-cookie'
import axios from "axios"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { useEffect } from 'react'
const Context = createContext()

export default Context

export const ContextProvider = ({ children }) => {
    const router = useRouter()
    const [invert, setinvert] = useState(null)
    const [user, setuser] = useState(Cookies.get('user_details') ? JSON.parse(Cookies.get('user_details')) : null)
    const [authtoken, setauthtoken] = useState(typeof window !== 'undefined' && localStorage.getItem('access_token') || typeof window !== 'undefined' && localStorage.getItem('refresh_token') ? { 'access_token': typeof window !== 'undefined' && localStorage.getItem('access_token'), 'refresh_token': typeof window !== 'undefined' && localStorage.getItem('refresh_token') } : null)
    const [IsOpen1,setIsOpen1] = useState(false)
    const [IsOpen2,setIsOpen2] = useState(false)
    const Logout = () => {
        setuser(null)
        Cookies.remove('user_details')
        Cookies.remove('access')
        Cookies.remove('refreh')
        localStorage.clear()

        axios.get('/api/auth/Logout').then((response) => {
            router.push('/Login_And_Signup')
            toast('Logged Out Succesfully', { position: toast.POSITION.TOP_LEFT })
        })
    }
    
    const openoffcanvas = () => {

        document.getElementById('offcanvas').classList.toggle('smenu1')
    }
    
    
        
  
     
    const [Blogs,setBlogs] = useState([])
    const ContextData = {
        authtoken: authtoken,
        setauthtoken: setauthtoken,
        user: user,
        Logout:Logout,
        setuser: setuser,
        invert: invert,
        setinvert:setinvert,
        Logout:Logout,
        IsOpen1:IsOpen1,
        IsOpen2:IsOpen2,
        setIsOpen1:setIsOpen1,
        setIsOpen2:setIsOpen2,
        openoffcanvas:openoffcanvas,
        Blogs:Blogs,
        setBlogs:setBlogs,
    }
    return (
        <Context.Provider value={ContextData}>
            {children}
        </Context.Provider>
    )
}
