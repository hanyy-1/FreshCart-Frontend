import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Card from '../Card/Card'

export default function RecommendationsSection() {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState('')

    async function getRecommendations() {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoading(false)
                return
            }

            // جيب أول منتج في السلة أو أي منتج عشوائي
            const cartRes = await axios.get('http://localhost:5143/api/v1/cart', {
                headers: { token }
            })

            let productId = null

            if (cartRes.data?.data?.products?.length > 0) {
                productId = cartRes.data.data.products[0].product._id
            } else {
                const productsRes = await axios.get('http://localhost:5143/api/v1/products')
                productId = productsRes.data?.data?.[0]?.id
            }

            if (!productId) {
                setLoading(false)
                return
            }

            const recoRes = await axios.get(
                `http://localhost:5143/api/v1/recommendations/${productId}`,
                { headers: { token } }
            )

            if (recoRes.data.status === 'success') {
                setRecommendations(recoRes.data.data)
                setSource(recoRes.data.source)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getRecommendations()
    }, [])

    if (!localStorage.getItem('token')) return null

    return (
        <div className='py-6'>
            {/* Header */}
            <div className='flex items-center gap-3 mb-5'>
                <div className='flex items-center gap-2'>
                    <span className='text-2xl'>🤖</span>
                    <h2 className='text-2xl font-semibold'>Recommendations  Section</h2>
                </div>
                {source === 'ai' && (
                    <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>
                        ✨ Powered by AI
                    </span>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <div className='flex items-center gap-3 py-8 text-gray-500'>
                    <svg className='animate-spin h-5 w-5 text-maincolor'
                        xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10'
                            stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor'
                            d='M4 12a8 8 0 018-8v8z'></path>
                    </svg>
            
                </div>
            )}

            {/* Recommendations Swiper */}
            {!loading && recommendations.length > 0 && (
                <Swiper
                    slidesPerView={2}
                    spaceBetween={12}
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        640:  { slidesPerView: 2 },
                        768:  { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                >
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
            )}
        </div>
    )
}