import { ShoppingCart, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { Wishlistcontext } from '../../context/WishList.context'
import { CartContext } from '../../context/Cart.context'

export default function WishlistItem({ wishlistInfo }) {
  const { removeFromWishlist } = useContext(Wishlistcontext)
  const { addToCart } = useContext(CartContext)
  const { price, imageCover, _id, title } = wishlistInfo

  return (
    <div className='group flex items-center gap-5 bg-white rounded-3xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200'>
      {/* Image */}
      <div className='relative w-28 h-28 rounded-2xl overflow-hidden bg-gray-50 shrink-0'>
        <img
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          src={imageCover}
          alt={title}
        />
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <h3 className='text-gray-900 font-bold text-base line-clamp-1 mb-1'>{title}</h3>
        <p className='text-green-600 font-black text-xl'>
          {price} <span className='text-sm font-semibold text-gray-400'>EGP</span>
        </p>
        <button
          onClick={() => removeFromWishlist(_id)}
          className='flex items-center gap-1.5 text-red-400 hover:text-red-600 text-sm font-medium mt-2 transition-colors'
        >
          <Trash2 size={14} />
          Remove
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={() => addToCart(_id)}
        className='flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-2xl transition-all duration-200 shadow-md shadow-green-200 shrink-0'
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    </div>
  )
}
