import React from 'react'
import Context from '@/context/Context'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { QueryClient,useQuery,dehydrate } from '@tanstack/react-query'
import axios from 'axios'
import AddBlog from '@/components/AddBlog'
import BlogElement from '@/components/BlogElement'
export default function SearchPage() {
    const router = useRouter()
    const SearchecdBlogs = useQuery(["SearchedBlogs"], ()=>{
        return fetchSearchedBlogs(router.query.SearchQuery)
    })
    
    const { user, authtoken,invert } = useContext(Context)
    return (
        <div>
            <div className={`bg-[url('/images/addblog5.png')] w-full ${invert} ${((user || authtoken || SearchecdBlogs?.data?.length!==0) && !SearchecdBlogs.isLoading && !SearchecdBlogs.isError) ? "h-full" : "h-screen"} z-[100] pt-32`}>

                <div className=" pt-20">
                {!SearchecdBlogs.isLoading || !SearchecdBlogs.isFetching || SearchecdBlogs?.data?.length == 0?(
                    <h1 className='text-white text-center font-bold text-3xl'>You Have {SearchecdBlogs?.data?.length} Result For Your Search Query {`"`}{router.query.SearchQuery}{`"`}</h1>
                ):(
                    null
                )}
                


                    <div id="blogpage" className='bg-[rgb(31 32 41 / var(--tw-bg-opacity))] pt-0 '>
                        
                        {(SearchecdBlogs.isError) ? (
                            <h1 className='text-center text-white text-3xl font-bold'>{SearchecdBlogs?.error?.message}</h1>
                        ) : (
                            null
                        )}
                        {SearchecdBlogs.isLoading ? (
                            <h1 className='text-center text-white text-3xl font-bold'>Loading...</h1>
                        ) : (
                            null
                        )}
                        {(SearchecdBlogs?.data?.length !== 0 && !SearchecdBlogs.isLoading && !SearchecdBlogs.isError) ? (
                            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 '>
                                {SearchecdBlogs?.data?.map((blog) => {
                                    return (
                                        <div key={blog.id}>
                                            <BlogElement blog={blog} />
                                        </div>
                                    )
                                })}

                                {/* <BlogElement2/> */}
                            </div>
                        ) : (
                            null
                        )}





                    </div>
                </div>
            </div>
        </div>
    )
}


export const fetchSearchedBlogs = async (query) => {
	return axios.get(`https://pclubbackend.pythonanywhere.com/api/v1/ListSearchedBlogs/?search=${query}`).then((response) => {
		return response.data
	})
}

export const getServerSideProps = async ({ req, res, params }) => {
    
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(["SearchedBlogs"], () => {
		return fetchSearchedBlogs(params.SearchQuery)
	})
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			cookies: req.cookies
		}
	}
}