import React from 'react'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { AiFillDelete, AiFillTags, AiFillCloseCircle } from "react-icons/ai";
import Context from '@/context/Context'
import Search from './Search'
import { useRouter } from 'next/router'
export default function OffCanvasNavbar() {
    const router = useRouter()
    const { invert,Logout,user,authtoken,setinvert } = useContext(Context)
    useEffect(() => {
        document.addEventListener('click', e => {

            const isDropDownButton = e.target.matches(['data-offcanvas-btn'])



            if (!isDropDownButton && e.target.closest('[data-offcanvas]') !== null) {
                return
            }
            else {

                document.getElementById('offcanvas').classList.remove('active')
            }
        })
    }, [])
    
    return (
        <div className={` overflow-hidden`}>
            <div id="offcanvas" className='absolute left-[-500px] bg-black h-[550px] w-[300px] overflow-hidden transition-all fade-in-out z-[10000000000000] !pb-10' data-offcanvas>

            <button
					className="mb-5"
					onClick={() => {
						CloseOffCanvasNavbar()
					}}
				>
					<AiFillCloseCircle className="w-6 h-6 focus:ring-4 focus:ring-opacity-50 focus:ring-black transition-all mx-5 mt-10 rounded-full fade-in-out " />
				</button>
                <h1 className='text-center text-white font-bold mx-10  text-3xl mb-10'>BLOG HERE</h1>
                <ul>


                    <div className={`mb-10 sm:hidden `}>
                        <Search className1={'flex md:hidden  !mx-auto  justify-center  overfow-hidden   w-[200px] '} className2={`w-full  bg-white ${invert}  flex   `} className3={'  !my-0   flex  !mr-2 !py-0 '} className4={' !mx-auto !p-2 !pr-0 text-black flex items-center   w-10 h-10'} inputClass={' !px-4 !py-1 !ml-2 !my-1 !w-full text-black   bg-transparent outline-none rounded-y-full rounded-l-full '} />
                    </div>


                    <Link className='' href="/"><li className='my-2 mx-auto border-2 p-2 rounded-md hover:invert transition-all fade-in-out focus:invert text-center w-[200px] bg-black text-white'>Home</li></Link>
                    {(user && authtoken)?(
                        <a onClick={()=>{
                            Logout()
                        }} className='' ><li className='my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white'>Logout</li></a>
                    ):(
                        <Link className='' href="/Login_And_Signup"><li className='my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white'>Login/Signup</li></Link>
                    )}
                    
                    <Link className='' href="/BlogPage"><li className='my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white'>Blog</li></Link>
                    <Link className='' href="/AboutPage"><li className='my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white'>About Us</li></Link>
                    <li className='my-2 mx-auto border-2 hover:invert transition-all fade-in-out focus:invert p-2 rounded-md text-center w-[200px] bg-black text-white ' onClick={()=>{
                        if(invert==null){
                            setinvert("invert")
                        }
                        else{
                            setinvert(null)
                        }
                    }}>{invert?"Dark Mode":"Light Mode"}</li>






                </ul>
            </div>
        </div>
    )
}


export const CloseOffCanvasNavbar = () => {

    document.querySelector('#offcanvas').classList.remove('smenu1')
  
  }