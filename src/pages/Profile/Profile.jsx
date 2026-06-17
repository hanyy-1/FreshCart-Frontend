import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { TokenContext } from '../../context/Tokin.Context'
import { object, string } from 'yup'
import Loading from '../../components/Loading/Loading'
import { User, Mail, Phone, Edit2, X, Check } from 'lucide-react'

export default function Profile() {
  const { token } = useContext(TokenContext)
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  async function getProfile() {
    try {
      const { data } = await axios.get('http://localhost:5143/api/v1/users/profile', { headers: { token } })
      setProfile(data.data)
      formik.setValues({ name: data.data.name, phone: data.data.phone })
    } catch (error) { console.log(error) }
  }

  useEffect(() => { getProfile() }, [])

  const formik = useFormik({
    initialValues: { name: '', phone: '' },
    validationSchema: object({
      name: string().required('Name is required').min(3).max(20),
      phone: string().required('Phone is required'),
    }),
    onSubmit: async (values) => {
      const loading = toast.loading('Updating...')
      try {
        const { data } = await axios.put('http://localhost:5143/api/v1/users/profile', values, { headers: { token } })
        setProfile(data.data)
        toast.success('Profile updated!')
        setIsEditing(false)
      } catch { toast.error('Something went wrong') }
      finally { toast.dismiss(loading) }
    }
  })

  if (!profile) return <Loading />

  return (
    <div className='py-10 max-w-xl mx-auto'>

      {/* Avatar Card */}
      <div className='bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white mb-6 shadow-lg'>
        <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4'>
          {profile.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className='text-2xl font-bold'>{profile.name}</h2>
        <p className='text-emerald-100 text-sm mt-1'>{profile.email}</p>
      </div>

      {/* Info Card */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>

        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100'>
          <h3 className='font-bold text-gray-800'>Profile Information</h3>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)}
              className='flex items-center gap-2 text-sm text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all font-semibold'>
              <Edit2 size={15} /> Edit
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className='divide-y divide-gray-100'>
            {[
              { icon: User, label: 'Name', value: profile.name },
              { icon: Mail, label: 'Email', value: profile.email },
              { icon: Phone, label: 'Phone', value: profile.phone },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className='flex items-center gap-4 px-6 py-4'>
                <div className='w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0'>
                  <Icon size={16} className='text-emerald-600' />
                </div>
                <div>
                  <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>{label}</p>
                  <p className='text-gray-800 font-semibold'>{value || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className='p-6 space-y-4'>
            {[
              { name: 'name', label: 'Name', icon: User },
              { name: 'phone', label: 'Phone', icon: Phone },
            ].map(({ name, label, icon: Icon }) => (
              <div key={name} className='space-y-1'>
                <label className='text-sm font-semibold text-gray-600'>{label}</label>
                <div className='relative'>
                  <Icon size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type='text' name={name}
                    value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
                  />
                </div>
                {formik.errors[name] && formik.touched[name] && (
                  <p className='text-red-500 text-xs'>{formik.errors[name]}</p>
                )}
              </div>
            ))}
            <div className='flex gap-3 pt-2'>
              <button type='submit'
                className='flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all'>
                <Check size={16} /> Save Changes
              </button>
              <button type='button' onClick={() => setIsEditing(false)}
                className='flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-all'>
                <X size={16} /> Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
