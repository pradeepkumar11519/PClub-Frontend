import React from 'react'
import { Formik,Form } from 'formik'
import Input3 from './Input3'
import TextArea from './TextArea'
import { useQuery, QueryClient, dehydrate, useQueryClient, useMutation } from '@tanstack/react-query';
import Context from '@/context/Context';
import { AiFillDelete, AiFillTags, AiFillCloseCircle } from "react-icons/ai";
import { useContext } from 'react';
import { useState } from 'react'
import * as Yup from 'yup';
import { toast } from "react-toastify";
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader'
export default function UpdateBlog({id}) {
	const { user, setuser, authtoken,setIsOpen1 } = useContext(Context)
    
    let [blogimage, setblogimage] = useState(null)
    const initialValues = {
        title: "",
        desc: "",
        user: user.username

    }
    const validationSchema = Yup.object({
        title: Yup.string().required('Required').min(5, 'Title Should Contain Atleast 5 Characters'),
        desc: Yup.string().required('Required'),
        

    })
    const test = useUpdateBlog()
    const onSubmit = (values) => {
        
        let formData = new FormData()
        formData.append('title', values.title)
        formData.append('desc', values.desc)
        formData.append('user', user.username)
        formData.append('image', blogimage[0])
        let data = {
            data: formData,
            token: authtoken.access_token,
			id:id
        }
        
        test.mutate(data)
    }
	return (
		<div>
			<div>
			
				<section className="text-gray-600 body-font relative">
					<div className="container px-5 py-24 mx-auto">
					<button
					className="mb-5"
					onClick={() => {
						setIsOpen1(false);
					}}
				>
					<AiFillCloseCircle className="w-6 h-6 focus:ring-4 focus:ring-opacity-50 focus:ring-black transition-all rounded-full fade-in-out " />
				</button>
						<div className="flex flex-col text-center w-full mb-12">
							<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Update Your Blog</h1>
							<p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hey!! Be Careful Before You Update It People Can Watch You</p>
							
							<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
								{
									formik => {
										return (
											<Form>
												<div className="p-2 w-full">
													<div className="relative">
														<label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
														<Input3 type="text" id="title" name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
													</div>
												</div>
												<div className="p-2 w-full">
													<div className="relative">
														<label htmlFor="image" className="leading-7 text-sm text-gray-600">Image</label>
														<input required type="file" id="image" name="image" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={e=>setblogimage(e.target.files)}  />
													</div>
												</div>
												<div className="p-2 w-full">
													<div className="relative">
														<label htmlFor="desc" className="leading-7 text-sm text-gray-600">Description</label>
														<TextArea as="textarea" id="desc" name="desc" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"/>
													</div>
												</div>
												<div className="p-2 w-full">
													<button disabled={!formik.errors ||  formik.isValidating || (test.isLoading && !test.isError)} type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{(test.isLoading) ? (<BarLoader className="text-white mx-auto text-center" color={"white"} />) : ("Update")}</button>
												</div>
											</Form>
										)
									}
								}
							</Formik>

						</div>
						
					</div>
				</section>
			</div>
		</div>
	)
}


const UpdateUserBlog = (data) => {
	return axios.put(`https://pclubbackend.pythonanywhere.com/api/v1/UpdateBlogs/${data.id}/`, data.data, {
		headers: {
			Authorization: 'Bearer ' + data.token
		}
	})
}

const useUpdateBlog = () => {
	const { setIsOpen1 } = useContext(Context)
	const queryClient = useQueryClient()
	return useMutation(UpdateUserBlog, {
		onSuccess: () => {
			queryClient.invalidateQueries(['EachBlog'])
			toast.success('Blog Updated Succesfully',{ position: toast.POSITION.TOP_LEFT })
			setIsOpen1(false)
		},
		onError: (content) => {
			queryClient.setQueryData(['EachBlog'], context.previousData)
			toast.error('Blog Couldnt Be Updated Due To An Error',{ position: toast.POSITION.TOP_LEFT })
			setIsOpen1(false)
		},
	})
}