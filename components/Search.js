import Context from '@/context/Context'
import { QueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { FaSearch, FaBars } from 'react-icons/fa'
export default function Search({className1,className2,className3,className4,inputClass}) {
    const [searchquery,setsearchquery] = useState(null)
    const router = useRouter()
    const {openoffcanvas,invert} = useContext(Context)
    return (
            <div className={`${invert}  `}>
            <div id="" className={className1}>
                <div id="" className={className2}>
                    <input type="text" className={inputClass} onChange={(e)=>{
                        setsearchquery(e.target.value)
                    }} />
                    <button className={className3}><FaSearch className={className4} onClick={(e)=>{
            
                router.push(`/BlogPage/Search/${searchquery}`)
            const queryClient = new QueryClient()
            queryClient.invalidateQueries(['SearchedBlogs'])
            openoffcanvas()
            
            
            
        }} /></button>
                </div>

            </div>
            </div>
    )
}
