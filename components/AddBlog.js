import Context from '@/context/Context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Formik, Form } from 'formik'
import React from 'react'
import { toast } from "react-toastify";
import { useContext } from 'react'
import { useState } from 'react'
import * as Yup from 'yup';
import Input2 from './Input2'
import BarLoader from 'react-spinners/BarLoader'
import TextArea from './TextArea'
export default function AddBlog({AllBlogs}) {
    const { user, setuser, authtoken } = useContext(Context)
    
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
    const test = useAddBlog()
    
    const onSubmit = (values) => {
        
        let formData = new FormData()
        formData.append('title', values.title)
        formData.append('desc', values.desc)
        formData.append('user', user.username)
        formData.append('image', blogimage[0])
        let data = {
            data: formData,
            token: authtoken.access_token
        }
        
        test.mutate(data)
    }
    return (

        <div className="mb-20 px-10 sm:px-auto">
            <div>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {
                        formik => {
                            return (


                                <Form >
                                    <div id='form' className='!md:w-[500px] !w-full'>
                                        <h3>Add Your Blog Here</h3>

                                        <label for="title">Title</label>
                                        <Input2 className='items-center !text-white' type="text" placeholder="Title" id="title" name="title" />

                                        <label for="desc">Description</label>
                                        <TextArea as="textarea" className='items-center !text-white' placeholder="Description" id="desc" name="desc" />

                                        <label for="image">Image</label>
                                        <input className='items-center ' type="file" id="image" name="image" onChange={e=>setblogimage(e.target.files)} />

                                        <button disabled={!formik.errors ||  formik.isValidating || (test.isLoading && !test.isError)} type="submit" className='!text-black hover:bg-rose-600 hover:!text-white transition-all fade-in-out'>{(!formik.errors ||  formik.isValidating || (test.isLoading && !test.isError)) ? (<BarLoader className="text-black hover:text-white mx-auto text-center" color={"black"} />) : ("Submit")}</button>
                                    </div>
                                </Form>



                            )

                        }
                    }
                </Formik>

            </div>
            <style jsx>
                {`
                                  
                                  #form{
                                      height: fit-content;
                                      max-width: 500px;
                                      background-color: rgba(255,255,255,0.13);
                                      position: relative;
                                      transform: translate(-50%,25%);
                                      align-items:center;
                                      left: 50%;
                                      border-radius: 10px;
                                      backdrop-filter: blur(10px);
                                      border: 2px solid rgba(255,255,255,0.1);
                                      box-shadow: 0 0 40px rgba(8,7,16,0.6);
                                      padding: 50px 35px;
                                  }
                                  #form *{
                                      font-family: 'Poppins',sans-serif;
                                      color: #ffffff;
                                      letter-spacing: 0.5px;
                                      outline: none;
                                      border: none;
                                  }
                                  #form h3{
                                      font-size: 32px;
                                      font-weight: 500;
                                      line-height: 42px;
                                      text-align: center;
                                  }
                                  
                                  label{
                                      display: block;
                                      margin-top: 30px;
                                      font-size: 16px;
                                      font-weight: 500;
                                  }
                                  input,textarea{
                                      display: block;
                                      height: 50px;
                                      width: 100%;
                                      background-color: rgba(255,255,255,0.07);
                                      border-radius: 3px;
                                      padding: 0 10px;
                                      margin-top: 8px;
                                      font-size: 14px;
                                      font-weight: 300;
                                  }
                                  ::placeholder{
                                      color: #e5e5e5;
                                  }
                                  button{
                                      margin-top: 50px;
                                      width: 100%;
                                      background-color: #ffffff;
                                      color: #080710;
                                      padding: 15px 0;
                                      font-size: 18px;
                                      font-weight: 600;
                                      border-radius: 5px;
                                      cursor: pointer;
                                  }
                                  .social{
                                    margin-top: 30px;
                                    display: flex;
                                  }
                                  .social div{
                                    background: red;
                                    width: 150px;
                                    border-radius: 3px;
                                    padding: 5px 10px 10px 5px;
                                    background-color: rgba(255,255,255,0.27);
                                    color: #eaf0fb;
                                    text-align: center;
                                  }
                                  .social div:hover{
                                    background-color: rgba(255,255,255,0.47);
                                  }
                                  .social .fb{
                                    margin-left: 25px;
                                  }
                                  .social i{
                                    margin-right: 4px;
                                  }
                        `}
            </style>
        </div>
    )
}


const addUsersBlog = async (data) => {
    
    return axios.post('https://pclubbackend.pythonanywhere.com/api/v1/CreateBlogs/', data.data, {
        headers: {
            Authorization: 'Bearer ' + String(data.token)
        }
    })
}

const useAddBlog = () => {
    const queryClient = useQueryClient()
    return useMutation(addUsersBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries(["AllBlogs"])
            toast.success('Blog Added Succesfully',{ position: toast.POSITION.TOP_LEFT })
        },
        onError: (_error, context) => {
            queryClient.setQueryData(['AllBlogs'], context.previousData)
            toast.error('Blog Couldnt Be Added Due To An Error',{ position: toast.POSITION.TOP_LEFT })
        },
    })
}