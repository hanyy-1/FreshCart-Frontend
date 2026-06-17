import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/Cart.context'
import { TokenContext } from '../../context/Tokin.Context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MapPin, Phone, FileText, CreditCard, Banknote } from 'lucide-react'

export default function Checkout() {
  const { cartinfo } = useContext(CartContext)
  const { token } = useContext(TokenContext)
  const navigate = useNavigate()
  const [payment, setPayment] = useState('cash')

  async function makeCashOrder(values) {
    const loading = toast.loading('Placing order...')
    try {
      await axios.post(
        `http://localhost:5143/api/v1/orders/${cartinfo?.data?._id}`,
        { shippingAddress: values },
        { headers: { token } }
      )
      toast.success('Order placed successfully!')
      navigate('/allorders')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      toast.dismiss(loading)
    }
  }

  const formik = useFormik({
    initialValues: { city: '', phone: '', details: '' },
    onSubmit: (values) => {
      if (payment === 'online') {
        navigate('/online-payment')
      } else {
        makeCashOrder(values)
      }
    }
  })

  return (
    <div className='max-w-lg mx-auto py-10'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold text-gray-800'>Checkout</h2>
        <p className='text-gray-400 text-sm mt-1'>Fill in your shipping details</p>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5'>

        <div className='space-y-1'>
          <label className='text-sm font-semibold text-gray-600'>City</label>
          <div className='relative'>
            <MapPin size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input type='text' name='city'
              value={formik.values.city} onChange={formik.handleChange}
              placeholder='Cairo'
              className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
            />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm font-semibold text-gray-600'>Phone</label>
          <div className='relative'>
            <Phone size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input type='text' name='phone'
              value={formik.values.phone} onChange={formik.handleChange}
              placeholder='01xxxxxxxxx'
              className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400'
            />
          </div>
        </div>

        <div className='space-y-1'>
          <label className='text-sm font-semibold text-gray-600'>Address Details</label>
          <div className='relative'>
            <FileText size={16} className='absolute left-3 top-3.5 text-gray-400' />
            <textarea name='details'
              value={formik.values.details} onChange={formik.handleChange}
              placeholder='Street, building, apartment...'
              rows={3}
              className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none'
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className='space-y-2'>
          <label className='text-sm font-semibold text-gray-600'>Payment Method</label>
          <div className='grid grid-cols-2 gap-3'>
            <button type='button' onClick={() => setPayment('cash')}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all
                ${payment === 'cash' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              <Banknote size={18} /> Cash on Delivery
            </button>
            <button type='button' onClick={() => setPayment('online')}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold transition-all
                ${payment === 'online' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              <CreditCard size={18} /> Online Payment
            </button>
          </div>
        </div>

        <button type='button' onClick={formik.handleSubmit}
          className='w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all text-lg shadow-sm'>
          Place Order
        </button>

      </div>
    </div>
  )
}
