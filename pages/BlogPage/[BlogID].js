import AddBlog from '@/components/AddBlog';
import Input3 from '@/components/Input3';
import TextArea from '@/components/TextArea';
import UpdateBlog from '@/components/UpdateBlog';
import Context from '@/context/Context';
import { useQuery, QueryClient, dehydrate, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Form, Formik } from 'formik';
import { data } from 'jquery';
import { useRouter } from 'next/router'
import React from 'react'
import { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import Modal from "react-modal";
import { toast } from 'react-toastify'
import Comment from '@/components/Comment';
import { useState } from 'react';
import GridLoader from "react-spinners/GridLoader";
import BarLoader from 'react-spinners/BarLoader'

import { AiFillCloseCircle } from 'react-icons/ai'
export default function BlogID({ cookies }) {
	const router = useRouter()
	const { IsOpen1, setIsOpen1 } = useContext(Context)
	const [IsOpen3, setIsOpen3] = useState(false)
	const { authtoken, user,invert } = useContext(Context)

	const EachBlog = useQuery(["EachBlog"], () => {
		return fetchEachBlog(router.query.BlogID)
	})

	const test1 = useDeleteBlog()
	const onDeleteBlog = (id) => {
		let data1 = { id: id, token: authtoken.access_token }
		test1.mutate(data1)
	}
	const UsersComments = useQuery(["UsersComments"], () => {
		return fetchUsersComments(EachBlog?.data?.id)
	})


	const customStyles = {
		overlay: {
			position: "fixed",
			zIndex: 1020,
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			background: "rgba(0,0,0, 0.5)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",

		},
		content: {
			position: "fixed",
			background: "white",
			// width: '20rem',
			left: "0%",
			top: "0",
			width: "800px",
			height: "800px",
			overflowY: "auto",
			position: "relative",
			border: "1px solid #ccc",
			borderRadius: "0.3rem",

		},
	};
	const customStyles2 = {
		overlay: {
			position: "fixed",
			zIndex: 1020,
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			background: "rgba(0,0,0, 0.3)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		content: {
			background: "white",
			// width: '20rem',
			left: "0%",
			width: "250px",
			overflowY: "auto",
			position: "relative",
			border: "1px solid #ccc",
			borderRadius: "0.3rem",
		},
	};
	return (
		<div className={`bg-[url("/images/blogpost1.png")] bg-cover bg-center bg-no-repeat ${invert}  pt-32`}>
			{(EachBlog.isLoading && !EachBlog.isError) ? (
				<div className='mx-auto text-center my-20 flex items-center justify-center invert'><GridLoader /></div>
			) : (
				<section className="text-gray-600 body-font">
					<div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
						<img className={`md:h-[600px] mb-10 object-cover object-center rounded ${invert?"invert":""}`} alt="hero" src={EachBlog?.data?.image} />
						<div className="text-center lg:w-2/3 w-full">
							<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-100">{EachBlog?.data?.title}</h1>
							{(authtoken && user && user.username === EachBlog?.data?.user) ? (
								<div className='my-8'>
									<button onClick={() => {
										setIsOpen1(true)
									}} className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none mx-3">
										<GrUpdate />
										<span className="ml-4 flex items-start flex-col leading-none">
											<span className="text-xs text-gray-600 mb-1">Lets Evolve</span>
											<span className="title-font font-medium">Update</span>
										</span>
									</button>
									<button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none mx-3" onClick={() => {
										setIsOpen3(true)

									}}>
										<AiFillDelete />
										<span className="ml-4 flex items-start flex-col leading-none">
											<span className="text-xs text-gray-600 mb-1">Tell Byeee</span>
											<span className="title-font font-medium">Delete</span>
										</span>
									</button>

								</div>
							) : (
								null
							)}
							<div className='border-2 border-white bg-black bg-opacity-80 rounded-2xl text-white p-4 w-fit mx-auto mb-4'>
								<div className='my-3'>
									<span className='font-bold text-2xl'>Blogged By : </span><span className='font-medium text-xl'>{EachBlog?.data?.user}</span>
								</div>
								<div className='my-3 mb-5'>
									<span className='font-bold text-2xl'>On : </span><span className='font-medium text-xl'>{EachBlog?.data?.datestamp} {EachBlog?.data?.timestamp}</span>
								</div>
								<div className='!font-bold rounded-md my-3 bg-white p-2 w-fit text-black mx-auto cursor-pointer'>
								<Link activeClass="active" to="comment" spy={true} smooth={true} offset={50} duration={500} >
          Comment Now
        </Link>
									
								</div>
							</div>
							<p className="mb-8 leading-relaxed text-gray-300 font-bold text-xl">{EachBlog?.data?.desc}</p>

						</div>
					</div>
					<div className='pb-20' >
						<Comment id={EachBlog?.data?.id} cookies={cookies} CommentData={UsersComments.data} />
					</div>
				</section>
			)}



			<Modal
				isOpen={IsOpen1}
				style={customStyles}
				onRequestClose={() => {
					setIsOpen1(false);
				}}
			>
				<div>
					<UpdateBlog id={EachBlog?.data?.id} />
				</div>
			</Modal>
			<Modal isOpen={IsOpen3}
				style={customStyles2}
				onRequestClose={() => {
					setIsOpen3(false);
				}}>
				<button
					className="mb-5"
					onClick={() => {
						setIsOpen3(false);
					}}
				>
					<AiFillCloseCircle className="w-6 h-6 focus:ring-4 focus:ring-opacity-50 focus:ring-black transition-all rounded-full fade-in-out " />
				</button>
				<div className="text-xl font-medium mb-">
					Would You Like To Delete This Blog
				</div>

				<div className="flex flex-col justify-center">
					<button
						disabled={(test1.isLoading && !test1.isError)}
						className="p-2 bg-black text-white my-2  rounded-md"
						onClick={() => {
							onDeleteBlog(EachBlog?.data?.id)
						}}
					>
						{(test1.isLoading) ? (<BarLoader className="text-white mx-auto text-center" color={"white"} />) : ("Delete")}
					</button>
				</div>

			</Modal>
		</div>
	)
}

const fetchEachBlog = async (id) => {
	return axios.get(`https://pclubbackend.pythonanywhere.com/api/v1/RetrieveBlogs/${id}`, {
	}).then((response) => {
		return response.data
	})
}

export const getServerSideProps = async ({ req, res, params }) => {

	const queryClient1 = new QueryClient()
	await queryClient1.prefetchQuery(["EachBlog"], () => {
		return fetchEachBlog(params.BlogID)
	})
	const queryClient2 = new QueryClient()

	return {
		props: {
			dehydratedState: dehydrate(queryClient1),
			cookies: req.cookies
		}
	}
}




const DeleteBlog = async (data) => {
	return axios.delete(`https://pclubbackend.pythonanywhere.com/api/v1/DeleteBlogs/${data.id}/`, {
		headers: {
			Authorization: 'Bearer ' + data.token
		}
	})
}


const useDeleteBlog = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	return useMutation(DeleteBlog, {
		onSuccess: () => {
			queryClient.invalidateQueries(['EachBlog'])
			queryClient.invalidateQueries(['AllBlogs'])
			router.push('/BlogPage')
			toast.success('Blog Deleted Succesfully', { position: toast.POSITION.TOP_LEFT })

		},
		onError: (_error, context) => {
			queryClient.setQueryData(['EachBlog'], context.previousData)
			toast.error('Blog Couldnt Be Deleted Due To An Error', { position: toast.POSITION.TOP_LEFT })
		}
	})
}


const fetchUsersComments = async (id) => {
	return axios.get(`https://pclubbackend.pythonanywhere.com/api/v1/ListComment/${id}`).then((response) => {
		return response.data
	})
}

