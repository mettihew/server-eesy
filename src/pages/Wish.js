
import { useEffect, useState } from "react";
import { getUserCartProducts } from "../features/product/productSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap"

function Wish() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    (async () => {

      if (!user) return <a href="/login" className="cart-a-tag">ابتدا وارد شوید</a>
      const userList = user.list
      dispatch(getUserCartProducts(userList))

    })();
  }, [])

   const productState = useSelector(state => state.product.products)

   const productMap = productState.map(ev => {
    return(
      <a href={`/product/${ev._id}`} key={ev._id} className="cart-products">

      <p>{ev.name}</p>
      <img src={`${ev.images.title}`} width="100px" />

      </a>
    )
   })


   if (!user) return <a href="/login" className="cart-a-tag">ابتدا وارد شوید</a>
   if (productState.length < 1) return <p href="/login" className="cart-a-tag"> ابتدا محصول انتخاب کنید </p>


  return (
    <div style={{ overflow: "scroll" }}>

    <div className="cart-products-parent"> {productMap} </div>

    </div>
  )
}

export default Wish;