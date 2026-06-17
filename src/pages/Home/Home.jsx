import React, { useState, useMemo } from 'react'
import Card from '../../components/Card/Card'
import Loading from './../../components/Loading/Loading'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import RecommendationsSection from '../../components/RecommendationsSection/RecommendationsSection'
import useAllProducts from '../../Hooks/useAllProducts'
import { Search, X } from 'lucide-react'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch up to 30 products (change first arg to get more/less)
  const { products, isLoading, isError } = useAllProducts(30, 10)

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q) ||
        p.brand?.name?.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  if (isLoading) return <Loading />
  if (isError) return <h2>error</h2>

  const isSearching = searchQuery.trim().length > 0

  return (
    <div className='space-y-12 pb-16'>

      {/* Hero Slider */}
      <HomeSlider />

      {/* Category Slider Section */}
      <section className='px-2'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='w-1 h-7 bg-green-500 rounded-full' />
          <h2 className='text-2xl font-black text-gray-900'>Shop by Category</h2>
        </div>
        <CategorySlider />
      </section>

      {/* Search Bar + Products Section */}
      <section>
        {/* Search Bar */}
        <div className='flex items-center justify-between mb-6 gap-4 flex-wrap'>
          <div className='flex items-center gap-3'>
            <div className='w-1 h-7 bg-green-500 rounded-full' />
            <h2 className='text-2xl font-black text-gray-900'>
              {isSearching ? 'Search Results' : 'All Products'}
            </h2>
            <span className='text-sm text-gray-400 font-medium'>
              ({isSearching ? filteredProducts.length : products.length} items)
            </span>
          </div>

          {/* Search Input */}
          <div className='relative flex-1 max-w-md'>
            <Search
              size={17}
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
            />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search products, brands, categories…'
              className='w-full bg-white border border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-3 focus:ring-green-100 rounded-2xl pl-11 pr-10 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all shadow-sm'
            />
            {isSearching && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 hover:bg-red-100 hover:text-red-500 rounded-full flex items-center justify-center transition-colors'
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* No results */}
        {isSearching && filteredProducts.length === 0 ? (
          <div className='text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200'>
            <div className='text-5xl mb-4'>🔍</div>
            <h3 className='text-gray-700 font-bold text-lg mb-2'>No products found</h3>
            <p className='text-gray-400 text-sm'>
              Try searching with a different keyword.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className='mt-5 text-green-600 font-bold text-sm hover:underline'
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5'>
            {filteredProducts.map((product) => (
              <Card prodactinfo={product} key={product.id} />
            ))}
          </div>
        )}
      </section>

      {/* AI Recommendations */}
      {!isSearching && <RecommendationsSection />}
    </div>
  )
}
