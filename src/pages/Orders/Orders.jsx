import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../context/Tokin.Context'
import axios from 'axios'
import Loading from './../../components/Loading/Loading'
import { Package, CheckCircle, XCircle, Truck, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Orders() {
  const { token } = useContext(TokenContext)
  const [orders, setOrders] = useState(null)
  const decoded = jwtDecode(token)
  const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

  async function getAllOrders() {
    try {
      const { data } = await axios.get(`http://localhost:5143/api/v1/orders/user/${id}`, { headers: { token } })
      setOrders(data.data)
    } catch (error) {
      setOrders([])
    }
  }

  useEffect(() => { getAllOrders() }, [])

  if (orders == null) return <Loading />

  if (orders.length === 0) return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center text-center'>
      <div className='w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6'>
        <ShoppingBag size={40} className='text-emerald-400' />
      </div>
      <h2 className='text-2xl font-bold text-gray-700 mb-2'>No Orders Yet</h2>
      <p className='text-gray-400 mb-6'>You haven't placed any orders yet</p>
      <Link to='/home' className='px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all'>
        Start Shopping
      </Link>
    </div>
  )

  return (
    <div className='py-10 max-w-4xl mx-auto'>
      <div className='flex items-center gap-3 mb-8'>
        <div className='w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center'>
          <Package size={20} className='text-white' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>My Orders</h2>
          <p className='text-gray-400 text-sm'>{orders.length} order{orders.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className='space-y-6'>
        {orders.map((order) => (
          <div key={order._id} className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            
            {/* Order Header */}
            <div className='flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50'>
              <div>
                <p className='text-xs text-gray-400 uppercase tracking-wider font-semibold'>Order ID</p>
                <p className='font-bold text-gray-800'>#{order._id}</p>
              </div>
              <div className='flex items-center gap-3'>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                  ${order.isDelivered ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  <Truck size={13} />
                  {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                </span>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                  ${order.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                  {order.isPaid ? <CheckCircle size={13} /> : <XCircle size={13} />}
                  {order.isPaid ? 'Paid' : 'Not Paid'}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className='p-6'>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4'>
                {order.cartItems.map((product) => (
                  <div key={product.product._id} className='rounded-xl overflow-hidden border border-gray-100 bg-gray-50'>
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className='w-full h-28 object-cover'
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <div className='p-3'>
                      <h3 className='text-sm font-semibold text-gray-700 line-clamp-1'>{product.product.title}</h3>
                      <div className='flex justify-between mt-1'>
                        <span className='text-emerald-600 text-xs font-bold'>{product.price} EGP</span>
                        <span className='text-gray-400 text-xs'>x{product.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-end pt-4 border-t border-gray-100'>
                <div className='text-right'>
                  <p className='text-sm text-gray-400'>Total</p>
                  <p className='text-xl font-bold text-emerald-600'>{order.totalOrderPrice} EGP</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
