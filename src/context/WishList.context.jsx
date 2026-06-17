import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "./Tokin.Context";
import toast from "react-hot-toast";

export const Wishlistcontext = createContext(null)

export default function Wishlistprovider({children}) {
    const {token} = useContext(TokenContext)
    const [wishlistInfo, setWishlistInfo] = useState(null)

    async function addToWishlist(productId) {
        // Check if user is logged in
        if (!token) {
            toast.error('Please login first to add items to wishlist', {
                icon: '🔒',
                duration: 3000,
            })
            return
        }

        const loading = toast.loading('loading...')
        try {
            const options = {
                url: 'http://localhost:5143/api/v1/wishlist',
                method: 'POST',
                data: { productId },
                headers: { token }
            }
            const {data} = await axios.request(options)
            if (data.status == 'success') {
                toast.success('Added to wishlist')
                getWishlist()
            }
        } catch (error) {
            console.log(error)
            toast.error('Error adding to wishlist')
        } finally {
            toast.dismiss(loading)
        }
    }

    async function getWishlist() {
        if (!token) return

        try {
            const options = {
                url: 'http://localhost:5143/api/v1/wishlist',
                method: 'GET',
                headers: { token }
            }
            const {data} = await axios.request(options)
            setWishlistInfo(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeFromWishlist(productId) {
        const loading = toast.loading('loading...')
        try {
            const options = {
                url: `http://localhost:5143/api/v1/wishlist/${productId}`,
                method: 'DELETE',
                headers: { token }
            }
            const {data} = await axios.request(options)
            setWishlistInfo(data)
            toast.success('Removed from wishlist')
        } catch (error) {
            console.log(error)
            toast.error('Error removing from wishlist')
        } finally {
            toast.dismiss(loading)
        }
    }

    return (
        <Wishlistcontext.Provider value={{
            addToWishlist, getWishlist, wishlistInfo, removeFromWishlist
        }}>
            {children}
        </Wishlistcontext.Provider>
    )
}
