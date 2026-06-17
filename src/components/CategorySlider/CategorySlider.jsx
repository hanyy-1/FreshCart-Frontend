import axios from 'axios'
import React from 'react'
import Loading from '../Loading/Loading'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useQuery } from '@tanstack/react-query'

export default function CategorySlider() {

  async function getAllCategories() {
    const options = {
      url: 'http://localhost:5143/api/v1/categories',
      method: 'GET'
    }
    return await axios.request(options)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getAllCategories,
    staleTime: 100000,
    refetchOnMount: true
  })

  if (isLoading) return <Loading />

  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={14}
      loop={true}
      breakpoints={{
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
        1280: { slidesPerView: 7 },
      }}
    >
      {data.data.data.map((category) => (
        <SwiperSlide key={category._id}>
          <div className='group cursor-pointer text-center'>
            <div className='relative w-full aspect-square rounded-2xl overflow-hidden mb-2 ring-2 ring-transparent group-hover:ring-green-400 transition-all duration-300'>
              <img
                src={category.image}
                alt={category.name}
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
            <h2 className='text-xs font-bold text-gray-700 group-hover:text-green-600 transition-colors truncate px-1'>{category.name}</h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
