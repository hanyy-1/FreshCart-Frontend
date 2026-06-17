import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:5143/api/v1/products'

/**
 * Fetches ALL products from the paginated API.
 * Keeps fetching pages until either:
 *   a) we hit `maxProducts` total, or
 *   b) the API returns fewer items than `pageSize` (last page reached).
 *
 * @param {number} maxProducts  - Max products to fetch in total (default: 30)
 * @param {number} pageSize     - Items per API request            (default: 10)
 */
export default function useAllProducts(maxProducts = 30, pageSize = 10) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchAll() {
      setIsLoading(true)
      setIsError(false)

      const collected = []
      let page = 1

      try {
        while (collected.length < maxProducts) {
          const remaining = maxProducts - collected.length
          const limit = Math.min(pageSize, remaining)

          const { data } = await axios.get(`${BASE_URL}?limit=${limit}&page=${page}`)
          const items = data?.data ?? []

          if (!Array.isArray(items) || items.length === 0) break
          collected.push(...items)
          if (items.length < limit) break // last page reached

          page++
        }

        if (!cancelled) setProducts(collected.slice(0, maxProducts))
      } catch (err) {
        if (!cancelled) setIsError(true)
        console.error('useAllProducts error:', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, [maxProducts, pageSize])

  return { products, isLoading, isError }
}
