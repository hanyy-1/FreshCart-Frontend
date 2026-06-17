import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Navbar />
      <main className='container pt-20 pb-10 flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
