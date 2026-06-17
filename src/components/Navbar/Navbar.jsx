import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoimage from '../../assets/images/freshcart-logo.svg'
import { LogOut, ShoppingCart, User, Menu, X } from 'lucide-react'
import { TokenContext } from '../../context/Tokin.Context'
import { CartContext } from '../../context/Cart.context'

export default function Navbar() {
  const { token, logOut } = useContext(TokenContext)
  const { cartinfo, getAllCart } = useContext(CartContext)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { getAllCart() }, [])

  const navLinkStyle = ({ isActive }) =>
    `px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200
    ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'}`

  // All nav links - always visible
  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/proudacts', label: 'Products' },
    { to: '/Category', label: 'Category' },
    { to: '/Brands', label: 'Brands' },
    // These links only show when logged in
    ...(token ? [
      { to: '/allorders', label: 'Orders' },
      { to: '/wishlist', label: 'WishList' },
    ] : []),
  ]

  return (
    <nav className='bg-white border-b border-gray-100 fixed left-0 right-0 z-50 shadow-sm'>
      <div className='container flex items-center h-16 gap-4'>

        <Link to='/home' className='flex items-center gap-2 shrink-0'>
          <img src={logoimage} alt="FreshCart" className='h-8' />
        </Link>

        {/* Nav links - always visible */}
        <ul className='hidden md:flex items-center gap-1 mx-auto'>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink className={navLinkStyle} to={to}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <ul className='flex items-center gap-2 ms-auto'>
          {token ? (
            <>
              <li>
                <Link to='/cart' className='relative p-2 rounded-lg hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all flex items-center'>
                  <ShoppingCart size={22} />
                  <span className='absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold'>
                    {cartinfo?.numOfCartItems ?? 0}
                  </span>
                </Link>
              </li>
              <li>
                <NavLink to='/profile' className='p-2 rounded-lg hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all flex items-center'>
                  <User size={22} />
                </NavLink>
              </li>
              <li>
                <button onClick={logOut} className='p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all flex items-center'>
                  <LogOut size={22} />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/login' className='px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition-all'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/register' className='px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all shadow-sm'>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
