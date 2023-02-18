import React from 'react'
import { Field, ErrorMessage } from 'formik'

export default function Input2({ id, type, name, className, label, as, placeholder,autoComplete, ...rest }) {
    return (
        <div>
            <div>
                <Field as={as} name={name} {...rest}>
                    {
                        ({ field, form, meta }) => {

                            return (
                                <div className=''>
                                    <input {...field} className={className} type={type} id={id} placeholder={placeholder} autoComplete={autoComplete} />
                                    <div className='my-2 text-red-500'>
                                        <ErrorMessage className='' name={name}>
                                            
                                            {msg => {
                                                return (
                                                    <div className="">
                                                        <p className='p-1 text-center font-[900] text-red-500  '>{msg}</p>
                                                    </div>
                                                )
                                            }}

                                        </ErrorMessage>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Field>
            </div>
            <style jsx>
                {`
                                  
                                  form{
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
                                  form *{
                                      font-family: 'Poppins',sans-serif;
                                      color: #ffffff;
                                      letter-spacing: 0.5px;
                                      outline: none;
                                      border: none;
                                  }
                                  form h3{
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
