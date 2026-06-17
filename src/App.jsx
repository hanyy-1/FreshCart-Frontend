import { createBrowserRouter, RouterProvider,} from "react-router-dom"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ProdactedRoutes from "./components/ProdactedRoutes/ProdactedRoutes";
import GardRoutes from "./components/GardRoutes/GardRoutes";
import TokenProvider from "./context/Tokin.Context";
import VerifyCode from "./pages/verifyCode/VerifyCode";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Online from "./components/Online/Online";
import Offline from "./components/Offline/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Brands from "./pages/Brands/Brands";
import BrandProvider from "./context/brand.context";
import Products from "./pages/Products/Products";
import Category from "./pages/Category/Category";
import Wishlistprovider from "./context/WishList.context";
import WishList from "./pages/WishList/WishList";
import Profile from "./pages/Profile/Profile";
import OnlinePayment from "./pages/OnlinePayment/OnlinePayment";

const routes = createBrowserRouter([
  {
    // Public layout - accessible without login (home, products, brands, category)
    path: '', element: <Layout/>, children: [
      {path: 'home', element: <Home/>},
      {path: 'proudacts', element: <Products/>},
      {path: 'product/:id', element: <ProductDetails/>},
      {path: 'Category', element: <Category/>},
      {path: 'Brands', element: <Brands/>},
    ]
  },
  {
    // Protected layout - requires login
    path: '', element: <ProdactedRoutes><Layout/></ProdactedRoutes>, children: [
      {path: 'cart', element: <Cart/>},
      {path: 'checkout', element: <Checkout/>},
      {path: 'allorders', element: <Orders/>},
      {path: 'wishlist', element: <WishList/>},
      {path: 'profile', element: <Profile/>},
      {path: 'online-payment', element: <OnlinePayment/>},
    ]
  },
  {
    // Auth routes - redirect to home if already logged in
    path: '', element: <GardRoutes><Layout/></GardRoutes>, children: [
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>},
      {path: 'verifyCode', element: <VerifyCode/>},
      {path: 'ForgetPassword', element: <ForgetPassword/>},
      {path: 'ResetPassword', element: <ResetPassword/>},
    ]
  }
])

const x = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={x}>
        <TokenProvider>
          <Wishlistprovider>
            <BrandProvider>
              <CartProvider>
                <RouterProvider router={routes}></RouterProvider>
                <Toaster/>
              </CartProvider>
            </BrandProvider>
          </Wishlistprovider>
        </TokenProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </>
  )
}

export default App
