import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import Cookies from 'js-cookie'
import Input from "./Input";
import { QueryClient, useMutation } from '@tanstack/react-query'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import Context from '@/context/Context';
export default function LoginForm() {
    const initialValues = {
        email: "",
        password: "",
        username: ""
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email Format').required('Required'),

        password: Yup.string().required('Required'),

        username: Yup.string().required('Required'),


    });
    const less = useLoginUser()
    const onSubmit = (values) => {
        less.mutate(values)
    }
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                {
                    formik => {

                        return (

                            <>
                                <Form>
                                    <div className="form-group ">
                                        <Input type="text" name="username" className="form-style" placeholder="Your Username" id="username" autocomplete="off" />
                                        <i className="input-icon uil uil-at"></i>
                                    </div>
                                    <div className="form-group">
                                    <Input type="email" name="email" className="form-style" placeholder="Your Email" id="email" autocomplete="off" />
                                        <i className="input-icon uil uil-at"></i>
                                    </div>
                                    <div className="form-group mt-2">
                                        <Input type="password" name="password" className="form-style" placeholder="Your Password" id="password" autocomplete="off" />
                                        <i className="input-icon uil uil-lock-alt"></i>
                                    </div>
                                    <button disabled={!formik.errors || formik.isValidating || (less.isLoading && !less.isError)} type="submit" className="btn mt-4">{(less.isLoading && !less.isError)?"Loading...":"LOGIN"}</button>
                                </Form>
                            </>
                        )
                    }
                }
            </Formik>

            <style jsx>
                {`
                    @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

                    body{
                        font-family: 'Poppins', sans-serif;
                        font-weight: 300;
                        font-size: 15px;
                        line-height: 1.7;
                        color: #c4c3ca;
                        background-color: #1f2029;
                        overflow-x: hidden;
                    }
                    a {
                        cursor: pointer;
                      transition: all 200ms linear;
                    }
                    a:hover {
                        text-decoration: none;
                    }
                    .link {
                      color: #c4c3ca;
                    }
                    .link:hover {
                      color: #ffeba7;
                    }
                    p {
                      font-weight: 500;
                      font-size: 14px;
                      line-height: 1.7;
                    }
                    h4 {
                      font-weight: 600;
                    }
                    h6 span{
                      padding: 0 20px;
                      text-transform: uppercase;
                      font-weight: 700;
                    }
                    .section{
                      position: relative;
                      width: 100%;
                      display: block;
                    }
                    .full-height{
                      min-height: 100vh;
                    }
                    [type="checkbox"]:checked,
                    [type="checkbox"]:not(:checked){
                      position: absolute;
                      left: -9999px;
                    }
                    .checkbox:checked + label,
                    .checkbox:not(:checked) + label{
                      position: relative;
                      display: block;
                      text-align: center;
                      width: 60px;
                      height: 16px;
                      border-radius: 8px;
                      padding: 0;
                      margin: 10px auto;
                      cursor: pointer;
                      background-color: #ffeba7;
                    }
                    .checkbox:checked + label:before,
                    .checkbox:not(:checked) + label:before{
                      position: absolute;
                      display: block;
                      width: 36px;
                      height: 36px;
                      border-radius: 50%;
                      color: #ffeba7;
                      background-color: #102770;
                      font-family: 'unicons';
                      content: '\eb4f';
                      z-index: 20;
                      top: -10px;
                      left: -10px;
                      line-height: 36px;
                      text-align: center;
                      font-size: 24px;
                      transition: all 0.5s ease;
                    }
                    .checkbox:checked + label:before {
                      transform: translateX(44px) rotate(-270deg);
                    }
                    
                    
                    .card-3d-wrap {
                      position: relative;
                      width: 440px;
                      max-width: 100%;
                      height: 500px;
                      -webkit-transform-style: preserve-3d;
                      transform-style: preserve-3d;
                      perspective: 800px;
                      margin-top: 60px;
                    }
                    .card-3d-wrapper {
                      width: 100%;
                      height: 100%;
                      position:absolute;    
                      top: 0;
                      left: 0;  
                      -webkit-transform-style: preserve-3d;
                      transform-style: preserve-3d;
                      transition: all 600ms ease-out; 
                    }
                    .card-front, .card-back {
                      width: 100%;
                      height: 100%;
                      background-color: #2a2b38;
                      background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg');
                      background-position: bottom center;
                      background-repeat: no-repeat;
                      background-size: 300%;
                      position: absolute;
                      border-radius: 6px;
                      left: 0;
                      top: 0;
                      -webkit-transform-style: preserve-3d;
                      transform-style: preserve-3d;
                      -webkit-backface-visibility: hidden;
                      -moz-backface-visibility: hidden;
                      -o-backface-visibility: hidden;
                      backface-visibility: hidden;
                    }
                    .card-back {
                      transform: rotateY(180deg);
                    }
                    .checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
                      transform: rotateY(180deg);
                    }
                    .center-wrap{
                      position: absolute;
                      width: 100%;
                      padding: 0 35px;
                      top: 50%;
                      left: 0;
                      transform: translate3d(0, -50%, 35px) perspective(100px);
                      z-index: 20;
                      display: block;
                    }
                    
                    
                    .form-group{ 
                      position: relative;
                      display: block;
                        margin: 0;
                        padding: 0;
                    }
                    .form-style {
                      padding: 13px 20px;
                      padding-left: 55px;
                      height: 48px;
                      width: 100%;
                      font-weight: 500;
                      border-radius: 4px;
                      font-size: 14px;
                      line-height: 22px;
                      letter-spacing: 0.5px;
                      outline: none;
                      color: #c4c3ca;
                      background-color: #1f2029;
                      border: none;
                      -webkit-transition: all 200ms linear;
                      transition: all 200ms linear;
                      box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
                    }
                    .form-style:focus,
                    .form-style:active {
                      border: none;
                      outline: none;
                      box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
                    }
                    .input-icon {
                      position: absolute;
                      top: 0;
                      left: 18px;
                      height: 48px;
                      font-size: 24px;
                      line-height: 48px;
                      text-align: left;
                      color: #ffeba7;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    
                    .form-group input:-ms-input-placeholder  {
                      color: #c4c3ca;
                      opacity: 0.7;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input::-moz-placeholder  {
                      color: #c4c3ca;
                      opacity: 0.7;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input:-moz-placeholder  {
                      color: #c4c3ca;
                      opacity: 0.7;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input::-webkit-input-placeholder  {
                      color: #c4c3ca;
                      opacity: 0.7;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input:focus:-ms-input-placeholder  {
                      opacity: 0;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input:focus::-moz-placeholder  {
                      opacity: 0;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input:focus:-moz-placeholder  {
                      opacity: 0;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    .form-group input:focus::-webkit-input-placeholder  {
                      opacity: 0;
                      -webkit-transition: all 200ms linear;
                        transition: all 200ms linear;
                    }
                    
                    .btn{  
                      border-radius: 4px;
                      height: 44px;
                      font-size: 13px;
                      font-weight: 600;
                      text-transform: uppercase;
                      -webkit-transition : all 200ms linear;
                      transition: all 200ms linear;
                      padding: 0 30px;
                      letter-spacing: 1px;
                      display: -webkit-inline-flex;
                      display: -ms-inline-flexbox;
                      display: inline-flex;
                      -webkit-align-items: center;
                      -moz-align-items: center;
                      -ms-align-items: center;
                      align-items: center;
                      -webkit-justify-content: center;
                      -moz-justify-content: center;
                      -ms-justify-content: center;
                      justify-content: center;
                      -ms-flex-pack: center;
                      text-align: center;
                      border: none;
                      background-color: #ffeba7;
                      color: #102770;
                      box-shadow: 0 8px 24px 0 rgba(255,235,167,.2);
                    }
                    .btn:active,
                    .btn:focus{  
                      background-color: #102770;
                      color: #ffeba7;
                      box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
                    }
                    .btn:hover{  
                      background-color: #102770;
                      color: #ffeba7;
                      box-shadow: 0 8px 24px 0 rgba(16,39,112,.2);
                    }
                    
                    
                    
                    
                    .logo {
                        position: absolute;
                        top: 30px;
                        right: 30px;
                        display: block;
                        z-index: 100;
                        transition: all 250ms linear;
                    }
                    .logo img {
                        height: 26px;
                        width: auto;
                        display: block;
                    }
                `}
            </style>
        </div>
    )
}


const LoginUser = (user) => {
  return axios.post('api/auth/Login/', user, {
      withCredentials: true,
  })
}

const useLoginUser = () => {
  const router = useRouter()
  let { setauthtoken, setuser } = useContext(Context)
  return useMutation(LoginUser, {
      onSuccess: (response) => {
          
          setuser(response.data.user_details)
          setauthtoken({ 'access_token': response.data.access_token, 'refresh_token': response.data.refresh_token })
          
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          localStorage.setItem('user_details',JSON.stringify(response.data.user_details))
          
          router.push('/BlogPage')
          toast.success('You Have Logged In Successfully!!!', { position: toast.POSITION.TOP_LEFT })
          
          
      },
      onError: (error) => {
          const newerror = error.response.data
          toast.error('Invalid Credentials Please Recheck', { position: toast.POSITION.TOP_LEFT })
      }
  })
}