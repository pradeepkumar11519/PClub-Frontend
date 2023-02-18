import BlogElement from '@/components/BlogElement'
import axios from 'axios'
import React from 'react'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import AddBlog from '@/components/AddBlog'
import { useContext,useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Context from '@/context/Context'
import GridLoader from "react-spinners/GridLoader";
export default function BlogPage() {
	const { Blogs, setBlogs,user,authtoken,invert } = useContext(Context)
	const [nexturl,setnexturl] = useState('https://pclubbackend.pythonanywhere.com/api/v1/GetBlogs/')
	
	const AllBlogs = useQuery(["AllBlogs"], () => {
		return fetchAllBlogs(nexturl)
	}, {
		onSuccess: (data) => {
			setBlogs(data.results)
			setnexturl(data.next)
			localStorage.setItem('nexturl',nexturl)
		},
		refetchOnWindowFocus: false,
	})
	

	const fetchData = async () => {
		await axios.get(nexturl).then((response) => {
			localStorage.setItem('nexturl',nexturl)
			setnexturl(response.data.next)
			setBlogs(Blogs.concat(response.data.results))
		}).catch((e) => {

		})
	}
	if(AllBlogs.isLoading && !AllBlogs.isError){
		
	}
	return (
		<div className={`bg-[url('/images/addblog5.png')] ${invert} w-full pt-32 ${((user || authtoken || AllBlogs?.data?.length!==0 || Blogs.length!==0) && !AllBlogs.isLoading && !AllBlogs.isError) ? "h-full" : "h-screen"} h-screen z-[100] `}>

			<div className=" pb-20 mx-auto">
				{(user && authtoken) ? (
					<AddBlog AllBlogs={AllBlogs} />
				) : (
					null
				)}



				<div id="blogpage" className='bg-[rgb(31 32 41 / var(--tw-bg-opacity))] pt-32 flex justify-center'>
					{(AllBlogs?.data?.results?.length === 0 && (!AllBlogs.isError || !AllBlogs.isLoading)) ? (
						<h1 className='text-center text-white text-3xl font-bold z-[1000]'>No Blogs Available Currently</h1>
					) : (
						null
					)}
					{(AllBlogs.isError) ? (
						<h1 className='text-center h-full text-white text-3xl font-bold'>{AllBlogs?.error?.message}</h1>
					) : (
						null
					)}
					{AllBlogs.isLoading ? (
						<div className='mx-auto text-center my-20 flex items-center justify-center invert'><GridLoader /></div>
					) : (
						null
					)}
					
					{(AllBlogs?.data?.length !== 0 && !AllBlogs.isLoading && !AllBlogs.isError) ? (
						
							<InfiniteScroll
									dataLength={Blogs.length} //This is important field to render the next data
									next={fetchData}
									hasMore={nexturl!=null
									}
									
									loader={<div className='mx-auto text-center my-20  flex items-center justify-center invert'><GridLoader /></div>}


								>
									<div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 '>
							{Blogs?.map((blog) => {
								return (
									<div key={blog.id}>
										<BlogElement blog={blog} />
									</div>
								)
							})}
							</div>
							</InfiniteScroll>
							
						
					) : (
						null
					)}
					




				</div>
			</div>
		</div>
	)
}
const fetchAllBlogs = async (nexturl) => {
	return axios.get(nexturl).then((response) => {
		return response.data
	})
}

