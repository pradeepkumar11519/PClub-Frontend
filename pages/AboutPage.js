import Context from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useContext } from 'react'
import about1 from '../public/images/about.jpg'
// import Link from 'next/link'
export default function AboutPage() {
    const {invert} = useContext(Context)
    return (
        <div className={`bg-[#1f2029] ${invert} `}>
            <div className={`text-white pt-32 mx-20  `}>
                <section className="text-gray-300 body-font mx-auto flex justify-center">
                    <div className="container b px-5 py-24 mx-auto flex flex-wrap justify-center">
                        <div className="flex flex-wrap w-full   justify-center">
                            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6 ">
                                <div className="flex relative pb-12">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-100 mb-1 tracking-wider">WEBSITE MADE BY</h2>
                                        <p className="leading-relaxed">Pradeep Kumar Rebbavarapu</p>
                                    </div>
                                </div>
                                <div className="flex relative pb-12">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-100 mb-1 tracking-wider">FRAMEWORKS USED</h2>
                                        <p className="leading-relaxed">Frontend is Done With Next js and Backend is Done Using Django and Django Rest Framework.Css Frameworks Used Are Tailwind Css</p>
                                    </div>
                                </div>
                                <div className="flex relative pb-12">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <circle cx="12" cy="5" r="3"></circle>
                                            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-100 mb-1 tracking-wider">OTHER WEBSITES MADE BY ME ARE MENTIONED BELOW</h2>
                                        <p className="leading-relaxed">
                                            <div>
                                                Compile Website Headed By Cse Senator Yatharth Gupta Bhaiya <Link target={"_blank"} href={"https://tech-project-frontend.vercel.app/"} className="text-blue-500" >https://tech-project-frontend.vercel.app/</Link>
                                            </div>
                                            <div>
                                                Personal PortFolio Website
                                                <div><Link target={"_blank"} className='text-blue-500' href="https://portfolio-frontend-lilac-xi.vercel.app/" >https://portfolio-frontend-lilac-xi.vercel.app/</Link></div>
                                            </div>

                                        </p>
                                    </div>
                                </div>
                                <div className="flex relative pb-12">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-100 mb-1 tracking-wider">PERSONAL GITHUB ACCOUNTS</h2>
                                        <p className="leading-relaxed"><div>

                                            <div><Link target={"_blank"} className='text-blue-500' href="https://github.com/pradeepkumar11519" >https://github.com/pradeepkumar11519</Link></div>
                                            <div><Link target={"_blank"} className='text-blue-500' href="https://github.com/Pradeep-Kumar-Rebbavarapu" >https://github.com/Pradeep-Kumar-Rebbavarapu</Link></div>
                                        </div></p>
                                    </div>
                                </div>
                                <div className="flex relative">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                            <path d="M22 4L12 14.01l-3-3"></path>
                                        </svg>
                                    </div>
                                    <div className="flex flex-wrap !break-all pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-100 mb-1 tracking-wider">ADDITIONAL REACT TOOLS USED ARE</h2>
                                        <div className="leading-relaxed !break-all  flex flex-wrap ">React Formik - React Query - React Icons - React Infinite Scroll - React Top Loading Bar - React Modal - tippyjs/react - React Spinners - React Awesome Reveal</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex justify-center mx-auto ${invert}`}>
                                <Image className="lg:w-3/5 md:w-full object-cover object-center rounded-lg md:mt-0 mt-12  mx-auto " width="700" height="700" src={about1} placeholder="blur" alt="step" /></div>
                        </div>
                    </div>
                </section>

            </div>
            
        </div>
    )
}
