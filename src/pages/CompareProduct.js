
import { getUserCartProducts } from "../features/product/productSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CompareProduct() {
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

  const productMapImage = productState.map(ev => {
    return (
      <a href={`/product/${ev._id}`} key={ev._id}>
        <img src={`${ev.images.title}`} width="100px" />
      </a>
    )
  })

  const productMapName = productState.map(ev => {
    return (
      <a href={`/product/${ev._id}`} key={ev._id} >
        <p>{ev.name}</p>
      </a>
    )
  })

  const productMapPrice = productState.map(ev => {
    return (
      <a href={`/product/${ev._id}`} key={ev._id} >
        <p style={{ color: 'red' }}>${ev.price}</p>
      </a>
    )
  })

  const productMapBrand = productState.map(ev => {
    return (
      <a href={`/product/${ev._id}`} key={ev._id} >
        <p>{ev.brand}</p>
      </a>
    )
  })
  if (!user) return <a href="/login" className="cart-a-tag">ابتدا وارد شوید</a>
  if (productState.length < 1) return <p href="/login" className="cart-a-tag"> ابتدا محصول انتخاب کنید </p>


  return (
    <div style={{ overflow: "scroll" }}>

      <div className="compare-products-parent">
        <div className="compare-products">{productMapImage}</div>
        <div className="compare-products">{productMapName}</div>
        <div className="compare-products" >{productMapPrice}</div>
        <div className="compare-products" >{productMapBrand}</div>
      </div>

    </div>
  )
}

export default CompareProduct;