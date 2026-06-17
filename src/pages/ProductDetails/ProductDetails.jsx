import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { CartContext } from '../../context/Cart.context'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Card from './../../components/Card/Card'
import useOnline from '../../Hooks/useOnline'

export default function ProductDetails() {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)
    const [productDetails, setProductDetails] = useState(null)
    const [recommendations, setRecommendations] = useState([])
    const [recoSource, setRecoSource] = useState('')
    const [recoLoading, setRecoLoading] = useState(false)
    const { online } = useOnline()

    async function getProductDetails() {
        try {
            const { data } = await axios.get(`http://localhost:5143/api/v1/products/${id}`)
            setProductDetails(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getRecommendations() {
        try {
            setRecoLoading(true)
            const token = localStorage.getItem('token')
            if (!token) return

            const { data } = await axios.get(
                `http://localhost:5143/api/v1/recommendations/${id}`,
                { headers: { token } }
            )

            if (data.status === 'success') {
                setRecommendations(data.data)
                setRecoSource(data.source)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setRecoLoading(false)
        }
    }

    useEffect(() => {
        getProductDetails()
        getRecommendations()
    }, [id])

    return (
        <>
            {productDetails == null ? <Loading /> :
                <>
                    {/* Product Details */}
                    <div className='grid grid-cols-12 gap-6 py-10'>
                        <div className='col-span-4'>
                            <img
                                src={productDetails.imageCover}
                                alt={productDetails.title}
                                className='w-full rounded-lg'
                            />
                        </div>
                        <div className='col-span-8 py-5 space-y-5'>
                            <div>
                                <h2 className='text-xl'>{productDetails.title}</h2>
                                <h3 className='text-xl font-semibold text-maincolor'>
                                    {productDetails.categoryName}
                                </h3>
                            </div>
                            <p>{productDetails.description}</p>
                            <div className='flex items-center justify-between'>
                                <h4>{productDetails.price} EGP</h4>
                                <h4>
                                    {productDetails.ratingsAverage}{' '}
                                    <i className='fa-solid fa-star text-yellow-500'></i>
                                </h4>
                            </div>
                            {online ?
                                <button
                                    onClick={() => addToCart(productDetails.id)}
                                    className='btn w-full'>
                                    Add to Cart
                                </button>
                                : <h2>You are offline</h2>
                            }
                        </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className='mt-6 mb-10'>
                        <div className='flex items-center gap-3 mb-4'>
                            <h2 className='text-2xl font-semibold'>
                                {recoSource === 'ai' ? '🤖 AI Recommendations' : '📦 Related Products'}
                            </h2>
                            {recoSource === 'ai' && (
                                <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>
                                    Powered by AI
                                </span>
                            )}
                        </div>

                        {recoLoading ? (
                            <div className='flex items-center gap-2 text-gray-500 py-6'>
                                <svg className='animate-spin h-5 w-5 text-maincolor'
                                    xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                    <circle className='opacity-25' cx='12' cy='12' r='10'
                                        stroke='currentColor' strokeWidth='4'></circle>
                                    <path className='opacity-75' fill='currentColor'
                                        d='M4 12a8 8 0 018-8v8z'></path>
                                </svg>
                                <span>AI is finding best products for you...</span>
                            </div>
                        ) : recommendations.length > 0 ? (
                            <Swiper slidesPerView={4} spaceBetween={10} loop={false}>
                                {recommendations.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <Card prodactinfo={{
                                            id: product._id,
                                            title: product.title,
                                            price: product.price,
                                            priceAfterDiscount: product.priceAfterDiscount,
                                            imageCover: product.imageCover,
                                            ratingsAverage: product.ratingsAverage,
                                            categoryName: product.category,
                                            brandName: product.brand
                                        }} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <p className='text-gray-400'>No recommendations available.</p>
                        )}
                    </div>
                </>
            }
        </>
    )
}