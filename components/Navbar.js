import Context from '@/context/Context'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaBars } from 'react-icons/fa'
import OffCanvasNavbar from './OffCanvasNavbar';
import Search from './Search';
import { BsMoonStarsFill, BsMoonStars } from 'react-icons/bs'
export default function Navbar() {
    const router = useRouter()
    const { authtoken, user, Logout, openoffcanvas, invert, setinvert } = useContext(Context)



    return (
        <div>
            <div className={`absolute w-full z-[1000] ${invert} `}>
                <div id="nav" className={` w-full ${router.pathname === "/VerifyOTP" ? "hidden" : ""} rounded-b-full    text-white `} >
                    <header id="header" className={` ${router.pathname === "/Login_And_Signup" ? "bg-[#1f2029]" : ""} ${router.pathname.slice(0, 9) === "/BlogPage" ? "bg-black bg-opacity-90 rounded-b-full" : ""} ${router.pathname === "/BlogPage" ? "bg-white text-black  rounded-b-full" : ""}  fixed !flex !justify-between !my-auto !px-[40px] sm:!px-[100px]  w-full ${router.pathname === "/AboutPage" ? `bg-black invert text rounded-b-full  bg-opacity-90` : ""} `}>
                        <div className='logo !m-0 flex !p-0 md:!w-[200px]  !w-[100px] bg-transparent  text-center'>
                            <Link href="/" className=""><div className='!pl-4 lg:hidden !w-full !mx-4'><img src="/images/Blog.gif" className={`w-[50px]  h-[50px] ${router.pathname == "/BlogPage" ? "invert" : ""} `} /></div><div className='hidden lg:block !w-full !mx-4'>Blog Here</div></Link></div>
                        <div className='!hidden  lg:!flex  w-full'>

                            <ul className=' !ml-auto '>
                                <li className='hover:font-medium hover:text-lg transition-all fade-in-out hover:scale-105'><Link href="/">Home</Link></li>
                                {(authtoken && user) ? (
                                    <li className='hover:font-medium hover:text-lg transition-all fade-in-out hover:scale-105'><button onClick={Logout}>Logout</button></li>
                                ) : (
                                    <li className='hover:font-medium hover:text-lg transition-all fade-in-out hover:scale-105'><Link href="/Login_And_Signup">Login/Signup</Link></li>
                                )}

                                <li className='hover:font-medium hover:text-lg transition-all fade-in-out hover:scale-105'><Link href="/BlogPage">Blogs</Link></li>
                                <li className='hover:font-medium hover:text-lg transition-all fade-in-out hover:scale-105 !w-[85px]'><Link href="/AboutPage">About Us</Link></li>
                                <li className='hover:font-medium hover:text-lg transition-all fade-in-out hover:scale-105 !w-[85px]'><div id="user_information" className='my-auto  rounded-full p-2 mx-2'>
                                    <button onClick={() => {
                                        if (invert == null) {
                                            setinvert("invert")
                                        }
                                        else {
                                            setinvert(null)
                                        }
                                    }}>{invert ? (<BsMoonStarsFill />) : (<BsMoonStars />)}</button>
                                </div></li>

                            </ul>
                        </div>

                        <button id="offcanvas-btn" className='offcanvas-btn lg:hidden' data-offcanvas-button onClick={() => {
                            openoffcanvas()
                        }}>
                            <FaBars data-offcanvas-btn className='w-7 h-7 mr-5' />
                        </button>

                    </header>
                    <div className='lg:hidden'>
                        <OffCanvasNavbar />
                    </div>



                    <style jsx>
                        {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

                @import url('https://fonts.googleapis.com/css2?family=Rancho&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                @import url('https://fonts.googleapis.com/css2?family=Rancho&display=swap');
                  :root {
                    --primary: #094b65;
                }
                #nav{
                  background:black;
                }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Poppins', sans-serif;
                }
                
                body {
                    overflow-x: hidden;
               
                    min-height: 100vh;
                }
                
                #header {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 30px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 100;
                }
                
                #header .logo {
                    color: var(--primary);
                    font-weight: 700;
                    font-size: 2em;
                    text-decoration: none;
                }
                
                #header ul {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                #header ul li {
                    list-style: none;
                    margin-left: 20px;
                }
                
                #header ul li a {
                    text-decoration: none;
                    padding: 6px 15px;
                    color: var(--primary);
                    border-radius: 20px;
                }
                
                #header ul li a:hover,
                #header ul li a.active {
                    background: var(--primary);
                    color: #fff;
                }
                
                section {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                section::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100px;
                    background: linear-gradient(to top, var(--primary), transparent);
                    z-index: 10;
                }
                
                section img {
                    position: absolute;
                    top: 0px;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: none;
                }
                
                section #text {
                    position: absolute;
                    color: var(--primary);
                    font-size: 10vw;
                    text-align: center;
                    line-height: .55em;
                    font-family: 'Rancho', cursive;
                    transform: translatey(-50%);
                }
                
                section #text span {
                    font-size: .20em;
                    letter-spacing: 2px;
                    font-weight: 400;
                }
                
                #btn {
                    text-decoration: none;
                    display: inline-block;
                    padding: 8px 30px;
                    background: #fff;
                    color: var(--primary);
                    font-size: 1.2em;
                    font-weight: 500;
                    letter-spacing: 2px;
                    border-radius: 40px;
                    transform: translatey(100px);
                }
                
                .sec {
                    position: relative;
                    padding: 100px;
                    background: var(--primary);
                }
                
                .sec h2 {
                    font-size: 3.5em;
                    color: #fff;
                    margin-bottom: 10px;
                }
                
                .sec p {
                    font-size: 1em;
                    color: #fff;
                }
                
                footer {
                    position: relative;
                    padding: 0px 100px;
                    background: var(--primary);
                }
                
                footer a {
                    text-decoration: none;
                    color: #fff;
                }
                
                `}
                    </style>

                </div>

            </div>
            <div className={` `}>
                {router.pathname.slice(0, 9) === "/BlogPage" ? (

                   
                    <div className='absolute flex justify-center mx-auto w-full z-[100] '>
                      <Search className1={'hidden sm:flex  !mx-auto  justify-center  translate-y-[108px] lg:translate-y-[106px]  rounded-b-full w-[400px] md:w-[600px] lg:w-[800px] '} className2={`w-full rounded-b-full  flex ${router.pathname === "/BlogPage" ? "bg-rose-600" : "bg-blue-500"}  `} className3={'  !my-1   flex sm:!my-1 !mr-5 !py-2 '} className4={' !mx-auto !p-2 !pr-2 text-white flex items-center   w-10 h-10'} inputClass={' !px-4 !py-1 !ml-2 !my-1 !w-full text-white   bg-transparent outline-none rounded-y-full rounded-l-full '} />
                    </div>

                ) : (
                    null
                )}
            </div>
        </div>
    )
}
