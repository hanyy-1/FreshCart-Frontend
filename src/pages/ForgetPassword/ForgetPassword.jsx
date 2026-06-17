import React from 'react'
import { useFormik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Loading from './../../components/Loading/Loading';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import VerifyCode from '../verifyCode/VerifyCode';

export default function ForgetPassword() {


        const [error , setError]=useState(null)
        const Navigate=useNavigate()


      const validationSchema=  object(
        {
    
          email:string().required('email is required').email('email must be valid'),
          
    
        }
      )
      

    const formik = useFormik(
        {
            initialValues:{
                email:''
            },
            onSubmit:sendDataToForgetPassword,
            validationSchema, 
        }
    )
   async function sendDataToForgetPassword(values){
    const loading=toast.loading('loading')
try {
    setError(null)      
          const options = {
                url: "http://localhost:5143/api/v1/auth/forgotPasswords",
                method: "POST",
                data: values,
            };
    const {data} = await axios.request(options)
    toast.success('successfuly') 
            console.log(data);
                setTimeout(() => {
      Navigate('/VerifyCode')
    }, 2000);
            
    
} catch (error) {
    setError(error.response.data.message)
        toast.error('not  successfuly')

    
}finally{
    toast.dismiss(loading)
  }
    }

  return (
    <div className='py-40 m-5'>
                  <h2 className="text-3xl text-maincolor font-semibold my-4">
                    <i className="fa-regular fa-circle-user me-3"></i>
                    <span>Forget Password</span>
                </h2>
                { error && <p className="text-3xl text-red-500 "> {error} </p>}


        <form onSubmit={formik.handleSubmit}>
                  <div className='py-5'>
          <label htmlFor="">Email</label>
          <input type="text" 
          className='input bg-slate-100 w-full' 
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

            />
             { formik.errors.email &&formik.touched.email && <p className="text-red-500 font-semibold"> {formik.errors.email} </p>}

            </div>
             <button  type='submit' className='btn'>
                submit
        </button>
        </form>
    </div>
  )
}
