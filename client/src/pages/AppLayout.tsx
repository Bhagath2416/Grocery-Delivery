import { Outlet } from "react-router-dom"
import Banner from "../components/Banner"
import Navbar from "../components/Navbar"
import Footer from "../components/Home/Footer"
import CartSidebar from "../components/Home/CartSidebar"

const AppLayout = () => {
  return (
    <>
      <Banner />
      <Navbar />

      {/* that classs name is tailwindcsss 100vh */}

      <main className="min-h-screen">
        {/* here out let rendering child route */}
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </>
  )
}

export default AppLayout