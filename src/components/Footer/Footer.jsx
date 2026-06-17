import React from 'react'
import amazonlogo from '../../assets/images/amazon-pay.png'
import American from '../../assets/images/American-Express-Color.png'
import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'
import applestore from '../../assets/images/get-apple-store.png'
import googleplay from '../../assets/images/get-google-play.png'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-12 mt-20'>
      <div className='container space-y-8'>

        <div className='grid md:grid-cols-2 gap-8 pb-8 border-b border-gray-700'>
          <div>
            <h3 className='text-xl font-bold mb-2'>Get the FreshCart App</h3>
            <p className='text-gray-400 text-sm mb-4'>Shop smarter, faster — download the app and get exclusive deals.</p>
            <div className='flex gap-3'>
              <img src={applestore} alt="App Store" className='h-9 rounded-lg opacity-90 hover:opacity-100 cursor-pointer transition-all' />
              <img src={googleplay} alt="Google Play" className='h-9 rounded-lg opacity-90 hover:opacity-100 cursor-pointer transition-all' />
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex items-center gap-4'>
            <span className='text-gray-400 text-sm'>Payment Partners</span>
            <div className='flex items-center gap-3'>
              <img src={amazonlogo} alt="Amazon Pay" className='h-6 opacity-70 hover:opacity-100 transition-all' />
              <img src={American} alt="Amex" className='h-6 opacity-70 hover:opacity-100 transition-all' />
              <img src={mastercard} alt="Mastercard" className='h-6 opacity-70 hover:opacity-100 transition-all' />
              <img src={paypal} alt="PayPal" className='h-6 opacity-70 hover:opacity-100 transition-all' />
            </div>
          </div>
          <p className='text-gray-500 text-sm'>© 2025 FreshCart. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}
