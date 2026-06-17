import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { TokenContext } from '../../context/Tokin.Context'

export default function Login() {
  const PassRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [passType, setPassType] = useState(true)
  const { setToken } = useContext(TokenContext)

  const validationSchema = object({
    email: string().required('Email is required').email('Invalid email'),
    password: string().required('Password is required').matches(PassRegex, 'Must start with capital letter, min 6 chars'),
  })

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: sendDataToLogin,
    validationSchema,
  })

  async function sendDataToLogin(values) {
    const loading = toast.loading('Signing in...')
    try {
      setError(null)
      const { data } = await axios.post('http://localhost:5143/api/v1/auth/signin', values)
      if (data.token) {
        toast.success('Welcome back!')
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setTimeout(() => navigate('/home'), 1500)
      }
    } catch (error) {
      toast.error('Login failed')
      setError(error.response?.data?.message || 'Something went wrong')
    } finally {
      toast.dismiss(loading)
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left — Hero Image */}
      <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden'>
        <img
          src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80'
          alt='Fashion store'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 flex flex-col justify-end p-12'>
          <h2 className='text-white font-black text-4xl leading-tight mb-3'>Your Style,<br />Your Way.</h2>
          <p className='text-white/70 text-base max-w-xs'>Thousands of fashion items — delivered fast to your door.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12'>
        <div className='w-full max-w-md'>
          <div className='mb-8'>
            <h1 className='text-3xl font-black text-gray-900'>Welcome back</h1>
            <p className='text-gray-400 mt-1 text-sm'>Sign in to your account to continue</p>
          </div>

          <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-5'>
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 text-sm'>
                {error}
              </div>
            )}

            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-600'>Email</label>
              <div className='relative'>
                <Mail size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type='text' name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='you@example.com'
                  className='w-full pl-11 pr-4 py-3 border border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-3 focus:ring-green-100 rounded-2xl outline-none text-sm transition-all'
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className='text-red-500 text-xs'>{formik.errors.email}</p>
              )}
            </div>

            <div className='space-y-1'>
              <label className='text-sm font-bold text-gray-600'>Password</label>
              <div className='relative'>
                <Lock size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  type={passType ? 'password' : 'text'} name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='••••••••'
                  className='w-full pl-11 pr-11 py-3 border border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-3 focus:ring-green-100 rounded-2xl outline-none text-sm transition-all'
                />
                <button type='button' onClick={() => setPassType(!passType)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700'>
                  {passType ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className='text-red-500 text-xs'>{formik.errors.password}</p>
              )}
            </div>

            <div className='flex justify-end'>
              <Link to='/ForgetPassword' className='text-sm text-green-600 font-semibold hover:underline'>Forgot password?</Link>
            </div>

            <button
              type='submit'
              onClick={formik.handleSubmit}
              className='w-full py-3.5 bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-black rounded-2xl transition-all shadow-md shadow-green-200'
            >
              Sign In
            </button>

            <p className='text-center text-sm text-gray-400'>
              Don't have an account?{' '}
              <Link to='/register' className='text-green-600 font-bold hover:underline'>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
