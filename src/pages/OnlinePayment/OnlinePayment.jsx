import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function OnlinePayment() {
  const navigate = useNavigate()
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  function formatCardNumber(val) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(val) {
    return val.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!cardNumber || !expiry || !cvv || !name) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    const loadingToast = toast.loading('Processing payment...')
    setTimeout(() => {
      toast.dismiss(loadingToast)
      setLoading(false)
      toast.success('Payment successful! 🎉')
      setTimeout(() => navigate('/allorders'), 1500)
    }, 3000)
  }

  // detect card type
  const cardType = cardNumber.startsWith('4') ? 'VISA' :
    cardNumber.startsWith('5') ? 'MASTERCARD' :
    cardNumber.startsWith('3') ? 'AMEX' : ''

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12'>
      <div className='w-full max-w-md'>

        {/* Card Preview */}
        <div className='relative h-52 w-full rounded-2xl mb-8 overflow-hidden'
          style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'}}>
          <div className='absolute inset-0 p-6 flex flex-col justify-between text-white'>
            <div className='flex justify-between items-start'>
              <div className='w-10 h-10 rounded-full bg-yellow-400 opacity-80'
                style={{boxShadow: '20px 0 0 0 rgba(255,165,0,0.5)'}}/>
              <span className='text-lg font-bold tracking-widest text-blue-300'>
                {cardType || 'CARD'}
              </span>
            </div>
            <div>
              <p className='text-xl tracking-widest font-mono mb-4'>
                {cardNumber || '•••• •••• •••• ••••'}
              </p>
              <div className='flex justify-between text-sm'>
                <div>
                  <p className='text-gray-400 text-xs'>Card Holder</p>
                  <p className='uppercase tracking-wider'>{name || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p className='text-gray-400 text-xs'>Expires</p>
                  <p>{expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Payment Details</h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>Card Number</label>
              <input
                type='text'
                placeholder='1234 5678 9012 3456'
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>Cardholder Name</label>
              <input
                type='text'
                placeholder='John Doe'
                value={name}
                onChange={e => setName(e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='flex gap-4'>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Expiry Date</label>
                <input
                  type='text'
                  placeholder='MM/YY'
                  value={expiry}
                  onChange={e => setExpiry(formatExpiry(e.target.value))}
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex-1'>
                <label className='block text-sm font-medium text-gray-600 mb-1'>CVV</label>
                <input
                  type='password'
                  placeholder='•••'
                  maxLength={3}
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-4 rounded-xl text-white font-bold text-lg mt-2 transition-all'
              style={{background: loading ? '#9ca3af' : 'linear-gradient(135deg, #1a1a2e, #0f3460)'}}>
              {loading ? 'Processing...' : 'Pay Now 🔒'}
            </button>
          </form>

          <p className='text-center text-xs text-gray-400 mt-4'>
            🔒 Secured by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  )
}
