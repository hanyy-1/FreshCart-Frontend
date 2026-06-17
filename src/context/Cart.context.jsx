import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { TokenContext } from './Tokin.Context';
import toast from 'react-hot-toast';

export const CartContext = createContext(null)

export default function CartProvider({children }) {
  const {token} = useContext(TokenContext)
  const [cartinfo, setCartinfo] = useState(null)

  // add
  async function addToCart(productId) {
    // Check if user is logged in
    if (!token) {
      toast.error('Please login first to add items to cart', {
        icon: '🔒',
        duration: 3000,
      })
      return
    }

    const loading = toast.loading('loading...')
    try {
      const options = {
        url: 'http://localhost:5143/api/v1/cart',
        method: 'POST',
        headers: { token },
        data: { productId }
      }
      const {data} = await axios.request(options)
      if (data.status == 'success') {
        toast.success(data.message)
        getAllCart()
      }
    } catch (error) {
      console.log(error)
      toast.error('error')
    } finally {
      toast.dismiss(loading)
    }
  }

  // get
  async function getAllCart() {
    if (!token) return

    try {
      const options = {
        url: 'http://localhost:5143/api/v1/cart',
        method: "GET",
        headers: { token }
      }
      const {data} = await axios.request(options)
      setCartinfo(data)
    } catch (error) {
      console.log(error)
    }
  }

  // remove
  async function removeFromCart(productId) {
    const loading = toast.loading('loading...')
    try {
      const options = {
        url: `http://localhost:5143/api/v1/cart/${productId}`,
        method: 'DELETE',
        headers: { token }
      }
      const {data} = await axios.request(options)
      setCartinfo(data)
      toast.success('item removed from cart')
    } catch (error) {
      toast.error('error')
    } finally {
      toast.dismiss(loading)
    }
  }

  // clear
  async function clearCart() {
    const loadingid = toast.loading('loading...')
    try {
      const options = {
        url: `http://localhost:5143/api/v1/cart`,
        method: 'DELETE',
        headers: { token },
      }
      const {data} = await axios.request(options)
      console.log(data)
      setCartinfo({ numOfCartItems: 0 })
      toast.success('success')
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(loadingid)
    }
  }

  // update
  async function updateCart({productId, count}) {
    const loadingid = toast.loading('loading')
    try {
      const options = {
        url: `http://localhost:5143/api/v1/cart/${productId}`,
        method: 'PUT',
        data: { count },
        headers: { token },
      }
      const {data} = await axios.request(options)
      setCartinfo(data)
      toast.success('updated')
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(loadingid)
    }
  }

  return (
    <CartContext.Provider value={{addToCart, getAllCart, cartinfo, removeFromCart, clearCart, updateCart}}>
      {children}
    </CartContext.Provider>
  )
}
