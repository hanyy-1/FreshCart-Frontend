import { Eye, Heart, ShoppingCart, Star } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context'
import { Link } from 'react-router-dom'
import { Wishlistcontext } from '../../context/WishList.context'

export default function Card({ prodactinfo }) {
  const { id, title, description, imageCover, price, ratingsAverage } = prodactinfo
  const { addToCart } = useContext(CartContext)
  const { addToWishlist } = useContext(Wishlistcontext)

  return (
    <div className='group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-1'>
      {/* Image Container */}
      <div className='relative overflow-hidden bg-gray-50 h-56'>
        <img
          src={imageCover}
          alt={title}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
        />
        {/* Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400' />

        {/* Action Buttons */}
        <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400'>
          <button
            onClick={() => addToWishlist(id)}
            className='w-10 h-10 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-500 hover:text-red-500 hover:scale-110 transition-all shadow-lg'
          >
            <Heart size={16} />
          </button>
          <button
            onClick={() => addToCart(id)}
            className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl hover:scale-105 transition-all shadow-lg'
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
          <Link
            to={`/product/${id}`}
            className='w-10 h-10 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-500 hover:text-green-600 hover:scale-110 transition-all shadow-lg'
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>
        <h2 className='font-bold text-gray-900 line-clamp-1 text-sm mb-1 group-hover:text-green-700 transition-colors'>{title}</h2>
        <p className='text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed'>{description}</p>
        <div className='flex justify-between items-center'>
          <span className='text-green-600 font-black text-lg'>{price} <span className='text-xs font-semibold text-gray-400'>EGP</span></span>
          <div className='flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full'>
            <Star size={11} className='text-amber-400 fill-amber-400' />
            <span className='text-xs font-bold text-amber-600'>{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
