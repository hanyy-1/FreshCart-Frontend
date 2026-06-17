import React from 'react'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import useAllProducts from '../../Hooks/useAllProducts'

export default function Products() {
  // Fetch up to 30 products — change the number here to get more
  const { products, isLoading, isError } = useAllProducts(30, 10)

  if (isLoading) return <Loading />
  if (isError) return <h2>error</h2>

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 py-6'>
      {products.map((product) =>
        <Card prodactinfo={product} key={product.id} />
      )}
    </div>
  )
}
