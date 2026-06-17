import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/Cart.context'
import Loading from '../../components/Loading/Loading'
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import CartItem from '../../components/CartItem/CartItem'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { getAllCart, cartinfo, clearCart } = useContext(CartContext)

  useEffect(() => { getAllCart() }, [])

  if (!cartinfo) return <Loading />

  if (cartinfo?.numOfCartItems === 0) return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center text-center py-20'>
      <div className='w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6'>
        <ShoppingCart size={40} className='text-emerald-400' />
      </div>
      <h2 className='text-2xl font-bold text-gray-700 mb-2'>Your cart is empty</h2>
      <p className='text-gray-400 mb-6'>Looks like you haven't added anything yet</p>
      <Link to='/home' className='px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all'>
        Browse Products
      </Link>
    </div>
  )

  return (
    <div className='py-10 max-w-4xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center'>
            <ShoppingCart size={20} className='text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Shopping Cart</h2>
            <p className='text-gray-400 text-sm'>{cartinfo.numOfCartItems} items</p>
          </div>
        </div>
        <button onClick={clearCart} className='flex items-center gap-2 px-4 py-2 text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-all text-sm font-semibold'>
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6'>
        {cartinfo.data.products.map((cart) => (
          <CartItem cartinfo={cart} key={cart._id} />
        ))}
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
        <div className='flex justify-between items-center mb-4'>
          <span className='text-gray-500'>Subtotal</span>
          <span className='font-bold text-gray-800'>{cartinfo.data.totalCartPrice} EGP</span>
        </div>
        <div className='flex justify-between items-center mb-6 pb-6 border-b border-gray-100'>
          <span className='text-gray-500'>Shipping</span>
          <span className='text-emerald-600 font-semibold'>Free</span>
        </div>
        <div className='flex justify-between items-center mb-6'>
          <span className='text-xl font-bold text-gray-800'>Total</span>
          <span className='text-2xl font-bold text-emerald-600'>{cartinfo.data.totalCartPrice} EGP</span>
        </div>
        <Link to='/Checkout'>
          <button className='w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-lg'>
            Proceed to Checkout <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    </div>
  )
}
