import React, { useContext, useEffect } from 'react'
import { Wishlistcontext } from '../../context/WishList.context'
import Loading from '../../components/Loading/Loading'
import WishlistItem from './../../components/WishlistItem/WishlistItem'
import { Heart, ShoppingBag } from 'lucide-react'

export default function WishList() {
  const { getWishlist, wishlistInfo } = useContext(Wishlistcontext)

  useEffect(() => {
    getWishlist()
  }, [])

  if (!wishlistInfo) return <Loading />

  const isEmpty = wishlistInfo.data.length === 0

  return (
    <div className='py-10 max-w-3xl mx-auto'>
      {/* Header */}
      <div className='flex items-center gap-4 mb-8'>
        <div className='w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center'>
          <Heart className='text-red-500 fill-red-500' size={22} />
        </div>
        <div>
          <h1 className='text-3xl font-black text-gray-900'>Wishlist</h1>
          <p className='text-gray-400 text-sm mt-0.5'>
            {isEmpty ? 'No saved items yet' : `${wishlistInfo.data.length} saved item${wishlistInfo.data.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className='text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200'>
          <div className='w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5'>
            <Heart className='text-red-300' size={32} />
          </div>
          <h3 className='text-gray-700 font-bold text-lg mb-2'>Your wishlist is empty</h3>
          <p className='text-gray-400 text-sm'>Start adding products you love!</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {wishlistInfo.data.map((product) => (
            <WishlistItem wishlistInfo={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  )
}
