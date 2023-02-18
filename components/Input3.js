import React from 'react'
import { Field, ErrorMessage } from 'formik'

export default function Input3({ id, type, name, className, label, as, placeholder,autoComplete, ...rest }) {
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
            
        </div>
    )
}
