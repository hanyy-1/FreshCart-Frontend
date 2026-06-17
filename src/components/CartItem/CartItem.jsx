import { Trash } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context'

export default function CartItem({cartinfo}) {
    const {removeFromCart, updateCart} = useContext(CartContext)
    const {count, price, product} = cartinfo
    const {imageCover, title, _id} = product

    return (
        <div className='flex justify-between items-center my-4 px-5'>
            <div className='flex gap-5'>
                <img className='w-26' src={imageCover} alt="" />
                <div className='space-y-5'>
                    <div>
                        <h3 className='text-lg font-semibold'>{title}</h3>
                        <h4 className='text-maincolor font-light'>price: {price} EGP</h4>
                    </div>
                    <button onClick={() => {removeFromCart(_id)}} className='bg-red-600 text-white rounded-md px-4 py-2 flex items-center gap-2'>
                        <Trash/> delete
                    </button>
                </div>
            </div>
            <div className='space-x-3'>
                <button onClick={() => {updateCart({productId: _id, count: count+1})}} className='bg-maincolor text-white p-2 rounded-md'>
                    <i className='fa-solid fa-plus'></i>
                </button>
                <span>{count}</span>
                <button onClick={() => {updateCart({productId: _id, count: count-1})}} className='bg-maincolor text-white p-2 rounded-md'>
                    <i className='fa-solid fa-minus'></i>
                </button>
            </div>
        </div>
    )
}