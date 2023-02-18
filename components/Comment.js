import {
    dehydrate,
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { AiFillDelete, AiFillTags, AiFillCloseCircle } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Context from "../context/Context";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Fade } from "react-awesome-reveal";
import BarLoader from 'react-spinners/BarLoader'
import { AiOutlineSend } from "react-icons/ai"

export default function Comment({ cookies, CommentData,id }) {
    
    const { user, IsOpen2, setIsOpen2, authtoken } = useContext(Context)
    const [parentname, setparentname] = useState(null)
    const [commentdata, setcommentdata] = useState({
        data: {
            user: user?.username, comment: null, parent: null,blog:id
        },
        token: cookies?.access
    })

    const [updatedvalue, setupdatedvalue] = useState(null)
    const [commentid, setcommentid] = useState(null)
    const ChangeTagColour = (id, user) => {
        if (
            document.getElementById(`tagbtn${id}`).style.backgroundColor === "black"

        ) {
            setcommentdata({ ...commentdata, data: { ...commentdata.data, parent: null } })
            setparentname(null)
            document.getElementById(`tagbtn${id}`).style.color = "black";
            document.getElementById(`tagbtn${id}`).style.borderColor = "black";
            // setUserComment(null);
            // setparent(null);
            document.getElementById(`tagbtn${id}`).style.backgroundColor =
                "transparent";
            const elementlist = document.querySelectorAll(`#abovebtn`);

            for (let i = 0; i < elementlist.length; i++) {
                if (`tagbtn${id}` !== elementlist[i].children[0].getAttribute("id")) {
                    elementlist[i].children[0].style.display = "block";
                }
            }

        } else {
            setcommentdata({ ...commentdata, data: { ...commentdata.data, parent: id } })
            setparentname(user)
            document.getElementById(`tagbtn${id}`).style.backgroundColor = "black";
            document.getElementById(`tagbtn${id}`).style.color = "white";
            document.getElementById(`tagbtn${id}`).style.borderColor = "white";
            const elementlist = document.querySelectorAll(`#abovebtn`);

            for (let i = 0; i < elementlist.length; i++) {
                if (`tagbtn${id}` !== elementlist[i].children[0].getAttribute("id")) {
                    elementlist[i].children[0].style.display = "none";
                }
            }
        }
    }
    const temp1 = useAddComment()
    const onSubmit = () => {
        temp1.mutate(commentdata)
        document.getElementById('comment').value = ""
        setcommentdata({ ...commentdata, data: { ...commentdata.data, parent: null } })
        setcommentdata({ ...commentdata, data: { ...commentdata.data, comment: null } })
        setparentname(null)

    }
    const temp2 = useDeleteComment()
    const onDeleteComment = (deletedata) => {
        temp2.mutate(deletedata)

    }
    const temp3 = useUpdateComment()
    const onUpdateComment = (updatedata) => {
        temp3.mutate(updatedata)

    }
    const customStyles = {
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
        <div  className="invert">
            <h1  className="text-center text-4xl font-bold ">COMMENTS</h1>
            <div className="mx-10 mt-10 border-2 border-orange-500 flex rounded-full bg-black">
                <input type="text" placeholder="Type Your Comment" name="comment" id="comment" className="w-full p-2 outline-none rounded-full bg-transparent text-white font-bold" onChange={(e) => {
                    setcommentdata({ ...commentdata, data: { ...commentdata.data, comment: e.target.value } })
                }} />
                {user && authtoken ? (



                    <button className="p-2 border-2 w-fit  border-black  rounded-full m-2 text-xs sm:text-lg  bg-orange-500 text-white focus:ring-4 focus:ring-opacity-50 focus:ring-orange-500 transition-all fade-in-out" onClick={onSubmit} disabled={!user || !authtoken || temp1.isLoading || temp2.isLoading || temp3.isLoading}>
                        {temp1.isLoading ? (
                            <BarLoader className="w-10 h-10" />
                        ) : (
                            <AiOutlineSend />
                        )}

                    </button>



                ) : (
                    <button className="p-2 border-2 w-[250px]  border-black  rounded-full m-2 text-xs sm:text-lg  bg-orange-500 text-white focus:ring-4 focus:ring-opacity-50 focus:ring-orange-500 transition-all fade-in-out" disabled={!user || !authtoken || temp1.isLoading || temp2.isLoading || temp3.isLoading}>
                        Login To Comment
                    </button>
                )}



            </div>
            {CommentData?.length === 0 ? (
                <h1 className='text-center my-10 font-bold text-xl'>No Comments Available At This Moment</h1>
            ) : (
                <>
                    <div>

                        {parentname ? (
                            <div className="border-2 border-red-500 bg-gradient-to-br from-orange-500 to-yellow-500 p-2 mx-8 mt-8 rounded-md">
                                <Fade>
                                <h1 className="text-center text-2xl font-bold">
                                    You Have Tagged {parentname}</h1></Fade>
                            </div>
                        ) : (
                            null
                        )}

                    </div>
                    <div className='mb-10'>
                        {
                            CommentData?.map((comment) => {
                                return (
                                    <div className="mx-20 mt-10 shadow-2xl border-x-2 border-t-2 border-black rounded-md" key={comment.id}>

                                        <br />
                                        <div className='md:grid grid-cols-[100px_auto_250px_100px]  '>

                                            <div className='border-b-2 border-black'>
                                                <Fade>
                                                    <p className='text-center my-3 rounded-full w-fit mx-auto px-4 py-2 bg-black text-white uppercase font-bold'>{comment.user.slice(0, 1)}</p>
                                                    <p className='text-center my-2 mx-2'>{comment.user}</p>
                                                </Fade>
                                            </div>

                                            <div className='border-b-2 border-black p-2'>
                                                <Fade>
                                                    {comment.parent ? (
                                                        <div className="mx-3 text-center">
                                                            <span className='font-bold'>Replied To </span> <span>{comment.parent_name} </span>
                                                            <span className="font-bold"> On : </span> <span>{comment.parent_comment}</span>
                                                            <div className="">{comment.comment} </div>
                                                        </div>

                                                    ) : (
                                                        <div className="mx-3 text-center">
                                                            <span className='font-bold'>Commented : </span>
                                                            <span className="">{comment.comment} </span>
                                                        </div>
                                                    )}
                                                </Fade>

                                            </div>

                                            <div className='border-b-2 border-black p-3'>
                                                <Fade>
                                                    <p className='font-bold text-center'>On {comment.datestamp} {comment.timestamp}</p></Fade>
                                            </div>

                                            {user && authtoken ? (
                                                <div className='border-b-2 border-black p-3 flex md:block justify-center '>
                                                    {user?.username !== comment.user ? (
                                                        
                                                            <Fade>
                                                                <Tippy content="Tag">
                                                                <div id="abovebtn" className="md:my-auto">
                                                                    <button id={`tagbtn${comment.id}`}
                                                                        onClick={() => {
                                                                            ChangeTagColour(comment.id, comment.user)


                                                                        }} className="border-2 border-black mx-2 md:my-3  p-1 w-fit cursor-pointer ">
                                                                        <AiFillTags />
                                                                    </button>

                                                                </div>
                                                                </Tippy>
                                                            </Fade>
                                                        
                                                    ) : (
                                                        null
                                                    )}
                                                    {user?.username === comment.user ? (
                                                        <div className="flex justify-center ">
                                                            <Fade>
                                                                <Tippy content="Delete">
                                                                    <button className='border-2 border-black mx-2 p-1 cursor-pointer ' onClick={() => {
                                                                        onDeleteComment({ id: comment.id, token: cookies?.access })
                                                                        setcommentid(comment.id)
                                                                    }}>
                                                                        <AiFillDelete />
                                                                    </button>
                                                                </Tippy>
                                                            </Fade>
                                                            <Fade>
                                                                <Tippy content="Update">
                                                                    <button className="border-2 border-black mx-2 p-1 cursor-pointer " onClick={() => {
                                                                        setcommentid(comment.id)
                                                                        setIsOpen2(true)
                                                                    }}>
                                                                        <GrUpdate />
                                                                    </button>
                                                                </Tippy>
                                                            </Fade>
                                                        </div>
                                                    ) : (
                                                        null
                                                    )}




                                                </div>
                                            ) : (
                                                <div className='border-b-2 border-black p-3 flex md:block justify-center '>

                                                    
                                                        <Fade>
                                                        <Tippy content="Login To Tag">
                                                            <div id="abovebtn" className="md:my-auto mx-auto flex justify-center">
                                                                <button diabled={true} id={`tagbtn${comment.id}`}
                                                                    className="border-2 border-black mx-2 md:my-3  p-1 w-fit cursor-pointer ">
                                                                    <AiFillTags />
                                                                </button>

                                                            </div>
                                                            </Tippy>
                                                        </Fade>
                                                    


                                                    <div className="flex justify-center ">
                                                        <Fade>
                                                            <Tippy content="Login To Delete">
                                                                <div>
                                                                <button disabled={true} className='border-2 border-black mx-2 p-1 cursor-pointer '>
                                                                    <AiFillDelete />
                                                                </button>
                                                                </div>
                                                            </Tippy>
                                                        </Fade>
                                                        <Fade>
                                                            <Tippy content="Login To Update">
                                                                <div>
                                                                <button disabled={true} className="border-2 border-black mx-2 p-1 cursor-pointer ">
                                                                    <GrUpdate />
                                                                </button>
                                                                </div>
                                                            </Tippy>
                                                        </Fade>
                                                    </div>





                                                </div>
                                            )}



                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div >
                </>
            )}

            <Modal
                isOpen={IsOpen2}
                style={customStyles}
                onRequestClose={() => {
                    setIsOpen2(false);
                }}
            >
                <div>
                    <button
                        className="mb-5"
                        onClick={() => {
                            setIsOpen2(false);
                        }}
                    >
                        <AiFillCloseCircle className="w-6 h-6 focus:ring-4 focus:ring-opacity-50 focus:ring-black transition-all rounded-full fade-in-out " />
                    </button>
                    <div className="text-xl font-medium mb-">
                        Update Your Comment
                    </div>
                    <textarea
                        className="w-full border-2 border-black ring-4 ring-opacity-50 ring-black focus:ring-8 focus:ring-opacity-50 focus:ring-black rounded-md  p-1 font-medium text-black my-2"
                        type="text"
                        onChange={(e) => {
                            setupdatedvalue(e.target.value);
                        }}
                    />
                    <div className="flex flex-col justify-center">
                        <button
                            className="p-2 bg-black text-white my-2  rounded-md"
                            onClick={() => {
                                onUpdateComment({
                                    id: commentid,
                                    data: {
                                        comment: updatedvalue,
                                    },
                                    token: cookies?.access,
                                });
                            }}
                        >
                            {(temp3.isLoading) ? (<BarLoader className="text-white mx-auto text-center" color={"white"} />) : ("Update")}
                        </button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}


const AddComment = async (data) => {
    return axios.post('https://pclubbackend.pythonanywhere.com/api/v1/AddComment/', data.data, {
        headers: {
            Authorization: 'Bearer ' + String(data.token)
        }
    })
}

const useAddComment = () => {
    const queryClient = useQueryClient()
    return useMutation(AddComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(["UsersComments"])
            toast.success('Comment Added Succesfully')
        },
        onError: (_error, context) => {
            queryClient.setQueryData(['UsersComments'], context.previousData)
            toast.error('Comment Couldnt Be Added Due To An Error')
        },
    })
}

const DeleteComment = (data) => {
    return axios.delete(`https://pclubbackend.pythonanywhere.com/api/v1/RUDComment/${data.id}/`, {
        headers: {
            Authorization: 'Bearer ' + data.token
        }
    })
}


const useDeleteComment = () => {
    const queryClient = useQueryClient()
    return useMutation(DeleteComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['UsersComments'])
            toast.success('Comment Deleted Succesfully')

        },
        onError: (context) => {
            queryClient.setQueryData(['UsersComments'], context.previousData)
            toast.error('Comment Couldnt Be Deleted Due To An Error')
        }
    })
}


const UpdateComment = (data) => {
    return axios.put(`https://pclubbackend.pythonanywhere.com/api/v1/RUDComment/${data.id}/`, data.data, {
        headers: {
            Authorization: 'Bearer ' + data.token
        }
    })
}

const useUpdateComment = () => {
    const { setIsOpen2 } = useContext(Context)
    const queryClient = useQueryClient()
    return useMutation(UpdateComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(['UsersComments'])
            toast.success('Comment Updated Succesfully')
            setIsOpen2(false)
        },
        onError: (context) => {
            queryClient.setQueryData(['UsersComments'], context.previousData)
            toast.error('Comment Couldnt Be Updated Due To An Error')
            setIsOpen2(false)
        },
    })
}
