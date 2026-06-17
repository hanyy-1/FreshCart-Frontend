import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { object, ref, string } from 'yup'
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const PassRegex = /^[A-Z][A-Za-z0-9]{5,}$/
  const phoneRegex = /^(\+2){0,1}01[0125][0-9]{8}$/
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [passType, setPassType] = useState(true)
  const [rePassType, setRePassType] = useState(true)

  const validationSchema = object({
    name: string().required('Name is required').min(3, 'Min 3 chars').max(20, 'Max 20 chars'),
    email: string().required('Email is required').email('Invalid email'),
    password: string().required('Password is required').matches(PassRegex, 'Must start with capital letter, min 6 chars'),
    rePassword: string().required('Please confirm password').oneOf([ref('password')], "Passwords don't match"),
    phone: string().required('Phone is required').matches(phoneRegex, 'Must start with 010, 011, 012, or 015'),
  })

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '', password: '', rePassword: '' },
    onSubmit: sendDataToRegister,
    validationSchema,
  })

  async function sendDataToRegister(values) {
    const toastLoading = toast.loading('Creating account...')
    setLoading(true)
    try {
      setError(null)
      const { data } = await axios.post('http://localhost:5143/api/v1/auth/signup', values)
      if (data.token) {
        toast.success('Account created successfully!')
        setTimeout(() => navigate('/login'), 1500)
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
      toast.error('Registration failed')
    } finally {
      toast.dismiss(toastLoading)
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'John Doe' },
    { name: 'email', label: 'Email', type: 'text', icon: Mail, placeholder: 'you@example.com' },
    { name: 'phone', label: 'Phone', type: 'text', icon: Phone, placeholder: '01xxxxxxxxx' },
  ]

  return (
    <div className='min-h-screen flex'>
      {/* Left — Collage Grid */}
      <div className='hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900'>
        {/* 2x2 collage grid */}
        <div className='absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-1.5'>
          <div className='relative overflow-hidden rounded-2xl'>
            <img src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' alt='Sneakers' className='w-full h-full object-cover hover:scale-105 transition-transform duration-700' />
            <div className='absolute inset-0 bg-black/20' />
            <span className='absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-full'>👟 Footwear</span>
          </div>
          <div className='relative overflow-hidden rounded-2xl'>
            <img src='https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80' alt='Fashion' className='w-full h-full object-cover hover:scale-105 transition-transform duration-700' />
            <div className='absolute inset-0 bg-black/20' />
            <span className='absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-full'>👗 Fashion</span>
          </div>
          <div className='relative overflow-hidden rounded-2xl'>
            <img src='https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80' alt='TV & Electronics' className='w-full h-full object-cover hover:scale-105 transition-transform duration-700' />
            <div className='absolute inset-0 bg-black/20' />
            <span className='absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-full'>📺 Electronics</span>
          </div>
          <div className='relative overflow-hidden rounded-2xl'>
            <img src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' alt='Accessories' className='w-full h-full object-cover hover:scale-105 transition-transform duration-700' />
            <div className='absolute inset-0 bg-black/20' />
            <span className='absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded-full'>⌚ Accessories</span>
          </div>
        </div>

        {/* Overlay text */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10'>
          <h2 className='text-white font-black text-4xl leading-tight mb-2'>Everything<br />in One Place.</h2>
          <p className='text-white/70 text-sm max-w-xs'>Shoes, clothes, electronics & more — all delivered to your door.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto'>
        <div className='w-full max-w-md'>
          <div className='mb-8'>
            <h1 className='text-3xl font-black text-gray-900'>Create Account</h1>
            <p className='text-gray-400 mt-1 text-sm'>Join and start shopping today</p>
          </div>

          <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-4'>
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 text-sm'>
                {error}
              </div>
            )}

            {fields.map(({ name, label, type, icon: Icon, placeholder }) => (
              <div key={name} className='space-y-1'>
                <label className='text-sm font-bold text-gray-600'>{label}</label>
                <div className='relative'>
                  <Icon size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type={type} name={name}
                    value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    placeholder={placeholder}
                    className='w-full pl-11 pr-4 py-3 border border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-3 focus:ring-green-100 rounded-2xl outline-none text-sm transition-all'
                  />
                </div>
                {formik.errors[name] && formik.touched[name] && (
                  <p className='text-red-500 text-xs'>{formik.errors[name]}</p>
                )}
              </div>
            ))}

            {[
              { name: 'password', label: 'Password', show: passType, toggle: setPassType },
              { name: 'rePassword', label: 'Confirm Password', show: rePassType, toggle: setRePassType },
            ].map(({ name, label, show, toggle }) => (
              <div key={name} className='space-y-1'>
                <label className='text-sm font-bold text-gray-600'>{label}</label>
                <div className='relative'>
                  <Lock size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type={show ? 'password' : 'text'} name={name}
                    value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    placeholder='••••••••'
                    className='w-full pl-11 pr-11 py-3 border border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-3 focus:ring-green-100 rounded-2xl outline-none text-sm transition-all'
                  />
                  <button type='button' onClick={() => toggle(!show)} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700'>
                    {show ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                {formik.errors[name] && formik.touched[name] && (
                  <p className='text-red-500 text-xs'>{formik.errors[name]}</p>
                )}
              </div>
            ))}

            <button disabled={loading} onClick={formik.handleSubmit} type='submit'
              className='w-full py-3.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 active:scale-[0.98] text-white font-black rounded-2xl transition-all shadow-md shadow-green-200 mt-2'>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className='text-center text-sm text-gray-400'>
              Already have an account?{' '}
              <Link to='/login' className='text-green-600 font-bold hover:underline'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
