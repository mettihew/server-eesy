import Home from "./components/Home"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Products from "./pages/Products"
import SingleProduct from "./pages/SingleProduct"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Order from "./pages/Order"
import Search from "./pages/Search"
import NotFound from "./components/NotFound"
import Category from "./pages/Category"
import Categories from "./pages/Categories"
import Favorite from "./pages/Favorite"
import CompareProduct from "./pages/CompareProduct"
import Test from "./components/Test"

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/s" element={<Search />} />
        <Route path="/test" element={<Test />} />
        <Route path="/category" element={<Category />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/compare-product" element={<CompareProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App