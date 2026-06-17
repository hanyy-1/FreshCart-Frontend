import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {   useNavigate } from 'react-router-dom';
import { number, object } from 'yup';

export default function VerifyCode() {
const [error ,setError]=useState(null)
const Navigate=useNavigate
  const validationSchema = object({
    resetCode: number().required("input is required"),
  });

  const formik =useFormik({
    initialValues:{
  resetCode:""
    },
       onSubmit: checkCode,
    validationSchema,
  })
  async function checkCode(values){
    const loading=toast.loading('loading')
 try {
  setError(null)
       const options = {
                url: "http://localhost:5143/api/v1/auth/verifyResetCode",
                method: "POST",
                data: values,
            };
            const{data} =await axios.request(options)
            console.log(data);
            
            toast.success('successfuly') 
                    setTimeout(() => {
                {
                    Navigate("/ResetPassword");
                }
            }, 1000);
            
 } catch (error) {
  setError(error.response.data.message)
   toast.error('not  successfuly')
  
  
 }
 finally{
    toast.dismiss(loading)
  }

  }
  






  return (
    
        <div className='py-40 m-5'>
                  <h2 className="text-3xl text-maincolor font-semibold my-4">
                    <i className="fa-regular fa-circle-user me-3"></i>
                    <span>Verify Code</span>
                </h2>
                 { error && <p className="text-3xl text-red-500 "> {error} </p>}
               


        <form onSubmit={formik.handleSubmit}>
                  <div className='py-5'>
          <label htmlFor="">VerifyCode </label>
          <input 
          type="text" 
          className='input bg-slate-100 w-full' 
          name='resetCode'
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        

            />
       { formik.errors.resetCode &&formik.touched.resetCode && <p className="text-red-500 font-semibold"> {formik.errors.resetCode} </p>}

          

            </div>
             <button  type='submit' className='btn'>
                submit
        </button>
        </form>
    </div>
    
  )
}
