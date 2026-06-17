import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
    badge: '🔥 New Arrivals',
    title: 'Dress to\nImpress',
    subtitle: 'Explore the latest fashion trends for every style.',
    cta: 'Shop Now',
    accent: 'from-gray-900/80 to-transparent',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80',
    badge: '👟 Footwear',
    title: 'Step Up\nYour Game',
    subtitle: 'Top brands, latest drops — your next pair is here.',
    cta: 'Shop Shoes',
    accent: 'from-slate-900/80 to-transparent',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80',
    badge: '✨ Season Sale',
    title: 'Style That\nSpeaks',
    subtitle: 'Premium clothing & accessories at unbeatable prices.',
    cta: 'View Deals',
    accent: 'from-zinc-900/80 to-transparent',
  },
]

const sideImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    label: '⌚ Accessories',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    label: '👜 Bags & More',
  },
]

export default function HomeSlider() {
  return (
    <div className='grid grid-cols-12 gap-3 pt-6'>
      {/* Main Slider — col 8 */}
      <div className='col-span-12 lg:col-span-8 rounded-3xl overflow-hidden'>
        <Swiper
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className='h-[320px] md:h-[380px]'
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className='relative w-full h-full'>
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className='w-full h-full object-cover'
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} via-black/30`} />

                {/* Text content */}
                <div className='absolute inset-0 flex flex-col justify-center px-8 md:px-12'>
                  <span className='inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-3'>
                    {slide.badge}
                  </span>
                  <h2 className='text-white font-black text-3xl md:text-4xl leading-tight drop-shadow-lg whitespace-pre-line'>
                    {slide.title}
                  </h2>
                  <p className='text-white/80 text-sm md:text-base mt-2 mb-5 max-w-xs'>
                    {slide.subtitle}
                  </p>
                  <button className='bg-green-500 hover:bg-green-400 active:scale-95 text-white font-bold text-sm px-6 py-2.5 rounded-2xl w-fit transition-all shadow-lg shadow-green-900/30'>
                    {slide.cta} →
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Images — col 4 */}
      <div className='hidden lg:flex col-span-4 flex-col gap-3'>
        {sideImages.map((item) => (
          <div key={item.id} className='group relative flex-1 rounded-3xl overflow-hidden cursor-pointer'>
            <img
              src={item.image}
              alt={item.label}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 p-4'>
              <span className='text-white font-bold text-sm drop-shadow'>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
