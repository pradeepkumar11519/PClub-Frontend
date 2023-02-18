import React from 'react'
import VanillaTilt from 'vanilla-tilt';
import { useEffect, useRef } from 'react';
import blog1 from '../public/images/blog1.webp'
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import Context from '@/context/Context';
export default function BlogElement({ blog }) {
  const {invert} = useContext(Context)
	function Tilt(props) {
		const { children, options, ...rest } = props;
		const tilt = useRef(null);

		useEffect(() => {
			VanillaTilt.init(tilt.current, options);
		}, [options]);

		return (<div ref={tilt} {...rest} >{children}</div>);
	}
	const options = {
		reverse: true,
		max: 15,
		speed: 400,
		scale: 1.12,
		glare: true,
		reset: true,
		perspective: 500,
		transition: true,
		"max-glare": 0.75,
		"glare-prerender": false,
		gyroscope: true,
		gyroscopeMinAngleX: -45,
		gyroscopeMaxAngleX: 45,
		gyroscopeMinAngleY: -45,
		gyroscopeMaxAngleY: 45
	}

	return (
		<div className={``}>

			<div className="flex-container w-fit">
				
					<div className=''>
						<Tilt className="box   max-w-full  !bg-gradient-to-br from-gray-50 to-gray-300 hover:from-gray-300 hover:to-gray-50 transition-all fade-in-out mx-10 " options={options} >

						<Link href={`/BlogPage/${blog.id}`} scroll={true}>
							<div className="flex-item text-center text-black font-bold text-xl !p-0" >
								<div className='absolute w-fit p-2 h-fit font-bol text-white bg-red-500 text-xs font-thin translate-y-[-10px] translate-x-[-50px] !md:translate-y-[-38px] rounded-md'>By {blog?.user}</div>
								<div id="title" className='pt-5'>{blog?.title}</div>
								<div id="img" className={`my-3  rounded-md flex justify-center`}>
									<img src={blog?.image} className={`rounded-md w-[400px] ${invert} h-[200px] `} />
								</div>
								<div className='my-3 text-sm font-thin'>
									{blog?.desc.slice(0, 500)}
								</div>
								<div id="time-date" className='grid grid-cols-2 border-t-2 pt-4 border-black text-xs font-thin'>
									<div className='border-r-2 border-black mb-5 text-xs font-thin'>{blog?.datestamp}</div>
									<div >{blog?.timestamp}</div>
								</div>
							</div>
							</Link>
						</Tilt>


					</div>
				
			</div>
			<style jsx>
				{`
                .box {
                  max-width:350px;
                  height:fit-content;
                  border-radius: 12px;
                  background-color: khaki;
                  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
                }
                    *,
                    *::before,
                    *::after {
                      box-sizing: border-box;
                    }
                    
                    .flex-container {
                      height: 100%;
                      display: -webkit-box;
                      display: flex;
                      -webkit-box-pack: center;
                              justify-content: center;
                      -webkit-box-align: center;
                              align-items: center;
                      -webkit-box-orient: horizontal;
                      -webkit-box-direction: normal;
                              flex-flow: row wrap;
                      padding: 3em 1em;
                      
                      
                    }
                    .flex-container .flex-item {
                      margin: 25px;
                      border-radius: 2px;
                      padding: 4.5em 5em;
                      position: relative;
                      min-height: 260px;
                      border-radius:5px;
                      }
                    .flex-container .flex-item:focus {
                            box-shadow: 0 0 3pt 2pt red;
                        }
                    .flex-container .flex-item a {
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      width: 100%;
                      height: 100%;
                      display: -webkit-box;
                      display: flex;
                      -webkit-box-pack: center;
                              justify-content: center;
                      -webkit-box-align: center;
                              align-items: center;
                      text-decoration: none;
                      text-align: center;
                      color: #fff;
                      font-size: 24px;
                      font-weight: normal;
                      line-height: 1.5;
                      -webkit-transition: 600ms ease;
                      transition: 600ms ease;
                      border-radius: 0px;
                    }
                    .flex-container .flex-item a span {
                      -webkit-transform: translateZ(50px) scale(0.7);
                              transform: translateZ(50px) scale(0.7);
                    }
                    
                    .tilt {
                      box-shadow: 0 20px 30px -13px rgba(0, 0, 0, 0.7);
                      -webkit-transform-style: preserve-3d;
                              transform-style: preserve-3d;
                      -webkit-transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
                              transform: perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
                    }
                    .tilt:hover {
                      box-shadow: 0 40px 70px -15px rgba(0, 0, 0, 0.7);
                    }
                    
                    .bg-one {
                      background: linear-gradient(45deg, #ff194b, #8215f0);
                    }
                    
                    .bg-two {
                      background: linear-gradient(45deg, #ff5f4b, #821564);
                    }
                    
                    .bg-three {
                      background: linear-gradient(45deg, #ff00bb, #82000f);
                    }
                    
                    .flex-item span > img {
                      width:200px;
                    }
                    .flex-item .text{
                      color:white;
                      font-weight:800;
                      font-family:Courier;
                      font-size:12px;
                      position:absolute;
                      bottom:20px;
                    }
                `}
			</style>


		</div >
	)
}
