import { useState, useEffect, useRef } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { getAProduct, reviewRating } from "../features/product/productSlice";
import { addToUCart, favoriteS } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
// use rating or reactStars
import { Rating } from 'react-simple-star-rating'
import ReactStars from "react-rating-stars-component";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FaAngleRight, t, FaAngleUp, FaHeart } from 'react-icons/fa'
import LoginModal from '../components/LoginModal'
import ProductCard from "../components/ProductCard";

function SingleProduct() {
  const reviewRef = useRef()
  const [colorDiv, setColorDiv] = useState()
  const [stars, setStars] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [colorErr, setColorErr] = useState(false)
  const [reviewErr, setReviewErr] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const productId = location.pathname.split("/")[2]

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(getAProduct(productId))
  }, [])

  const productState = useSelector(state => state.product.product)
  
  if (!productState) return <div id="j-c"> <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSItLWFuaW1hdGlvbi1zdGF0ZTogcnVubmluZzsiPgogICAgICA8c3R5bGU+CiAgICAgICAgOnJvb3QgewogICAgICAgICAgLS1hbmltYXRpb24tc3RhdGU6IHBhdXNlZDsKICAgICAgICB9CgogICAgICAgIC8qIHVzZXIgcGlja2VkIGEgdGhlbWUgd2hlcmUgdGhlICJyZWd1bGFyIiBzY2hlbWUgaXMgZGFyayAqLwogICAgICAgIDpyb290IHsKICAgICAgICAgIC0tcHJpbWFyeTogI2Y5ZmJmYTsKICAgICAgICAgIC0tc2Vjb25kYXJ5OiAjMDAxZTJiOwogICAgICAgICAgLS10ZXJ0aWFyeTogIzAwZWQ2NDsKICAgICAgICAgIC0taGlnaGxpZ2h0OiAjMDAxZTJiOwogICAgICAgICAgLS1zdWNjZXNzOiAjMDBlZDY0OwogICAgICAgIH0KCiAgICAgICAgLyogdGhlc2Ugc3R5bGVzIG5lZWQgdG8gbGl2ZSBoZXJlIGJlY2F1c2UgdGhlIFNWRyBoYXMgYSBkaWZmZXJlbnQgc2NvcGUgKi8KICAgICAgICAuZG90cyB7CiAgICAgICAgICBhbmltYXRpb24tbmFtZTogbG9hZGVyOwogICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7CiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDNzOwogICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7CiAgICAgICAgICBhbmltYXRpb24tcGxheS1zdGF0ZTogdmFyKC0tYW5pbWF0aW9uLXN0YXRlKTsKICAgICAgICAgIHN0cm9rZTogI2ZmZjsKICAgICAgICAgIHN0cm9rZS13aWR0aDogMC41cHg7CiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7CiAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgcjogbWF4KDF2dywgMTFweCk7CiAgICAgICAgICBjeTogNTAlOwogICAgICAgICAgZmlsdGVyOiBzYXR1cmF0ZSgyKSBvcGFjaXR5KDAuODUpOwogICAgICAgICAgZmlsbDogdmFyKC0tdGVydGlhcnkpOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDIpIHsKICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4xNXM7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoMykgewogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDQpIHsKICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC40NXM7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoNSkgewogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjZzOwogICAgICAgIH0KCiAgICAgICAgQGtleWZyYW1lcyBsb2FkZXIgewogICAgICAgICAgMCUgewogICAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOwogICAgICAgICAgfQogICAgICAgICAgNDUlIHsKICAgICAgICAgICAgb3BhY2l0eTogMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOwogICAgICAgICAgfQogICAgICAgICAgNjUlIHsKICAgICAgICAgICAgb3BhY2l0eTogMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOwogICAgICAgICAgfQogICAgICAgICAgMTAwJSB7CiAgICAgICAgICAgIG9wYWNpdHk6IDA7CiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICA8L3N0eWxlPgoKICAgICAgPGcgY2xhc3M9ImNvbnRhaW5lciI+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjMwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNDB2dyIvPgogICAgICAgIDxjaXJjbGUgY2xhc3M9ImRvdHMiIGN4PSI1MHZ3Ii8+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjYwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNzB2dyIvPgogICAgICA8L2c+CiAgICA8L3N2Zz4=" alt="loading" /> </div>

  let rate
  let sum = 0
  let max = 0
  let star = 0
  let percent = 0
  if (productState) {
    rate = productState.rating.map(ev => {
      sum += ev.rating
      max += 5
    })
    star = sum / rate.length
    star = Number(star.toFixed(1))
    percent = (sum / max) * 100
    percent = percent.toFixed(0)
  }

  const handleSubmit = (ev) => {
    if (!colorDiv) return setColorErr(true)
    const product = { color: colorDiv, token: user.token, uId: user._id, pId: productState._id }
    setColorDiv(ev)
    dispatch(addToUCart(product))
    setSubmit(true)
  }

  const handleFavorite = () => {
    dispatch(favoriteS({ productId: productState._id, userId: user._id }));
  };

  const starHandler = (ev) => {
    setReviewErr('')
    setStars(ev)
  }

  const reviewHandler = (ev) => {
    ev.preventDefault()
    const review = reviewRef.current.value
    if (!stars || !review) return setReviewErr('First review then submit your opinion')
    dispatch(reviewRating({ review, rating: stars, productId: productState._id, userName: user.name, userId: user._id }))
  window.location.reload()
  }

  let isF = false;
  if (user) {
    isF = user.list.some(pId => {
      return pId === productState._id
    })
  }

  return (
    <div className="single-product container">


      {/* DON'T DELETE BELOW DIV, IT REALLY IMPORTANT FOR THE PAGE'S RESPONSIVNESS, ZOOM IN AND OUT TO SEE THE RESULT */}
      <div className="I-AM-VERY-IMPORTANT">

        {/* WHERE AM I? */}
        <div className="whereAmI">
          <a href={``} >Home</a>
          <FaAngleRight color="gray" size="12px" />
          <a href={`/products`} >Products</a>
          <FaAngleRight color="gray" size="12px" />
          <a href={`/products/${productState.category}`} >{productState.category}</a>
          <FaAngleRight color="gray" size="12px" />
        </div>

        {/* MAIN ----------------------------------------------------------------------------------------------------------- */}
        <div className="single-product-body">



          {/* 3 - images */}

          {/* {productState && */}
          <div className="single-product-images">
              <Zoom><img alt="title" src={productState.images.title} width={"340px"} /></Zoom>
            <div className="single-product-images-others-div">
              {productState.images.others.map(ev => (
                <Zoom><img alt="others"src={ev} className="others"/></Zoom>
              ))}
            </div>
              {/* <img src={productState.images.title} alt='title'  /> */}
          </div>
          {/* } */}


          <div className="single-product-login-and-all-the-information">


            {/* 2 - ALL THE INFORMATION AND DETAILS ABOUT THE PRODUCT THAT YOU CAN SEE */}
            <div className="single-product-all-the-information-and-details">

              <h4 className="name-width">{productState.name}</h4>
              {productState.en_name && <p className="name-width">{productState.en_name}</p>}

              <div className="blue">
                <p> برند  : {productState.brand} </p>

                <div id="a-c">
                  <p>{star}</p>
                  <p style={{ color: 'yellow', marginRight: '5px' }}>
                    <Rating size="35" initialValue={star} readonly={true} allowFraction={true} emptyIcon={true} /> </p>
                </div>
                <p> - {rate.length} نظر دهی</p>

                <p className="border-bottom-global" >
                  | 32 answered questions
                </p>
              </div>
              <div>
                <p>  قیمت :</p>
                <h5 className="text-danger">تومان {productState.price}</h5>
              </div>
              <p>  رنگ :</p>
              {productState.color.map((ev, id) => (
                <div key={id}>
                  <p>{ev.color}</p>
                  <div onClick={() => setColorDiv(ev)} style={{ backgroundColor: ev.color }} className="single-product-color" />
                  <p>{ev.name}</p>
                </div>
              ))}

              {colorDiv && <div className="flx my-2"> <p> رنگ انتخاب شده:</p>
                <div className="color-global" style={{ backgroundColor: colorDiv.color }} />
                <p>{colorDiv.name}</p>
              </div>}

              <p className="blue">Size Chart</p>
              <p>. 100% Cotton</p>
              <p>. Imported</p>
              <p>. Lace Up closure</p>
              <p>. Machine Wash</p>
              {/* <p>{productState[0]?.description}</p> */}
              <p>{productState.feauture}</p>
            </div>


            {/* the end of the single-product-login-and-all-the-information" */}


            {/* 1 - LOGIN  */}

            <div className="single-product-add-to-cart-list">

              {user ?
                <div className="single-product-add-to-cart-button">
                  {(!colorDiv) && !colorErr && <p>Select color first</p>}
                  {colorErr && !colorDiv && <p className="text-danger">Select color first</p>}
                  {(colorDiv) && <p className="text-success">Order</p>}
                  {submit ? <a href={`/cart`}> <i className="fa fa-shopping-cart" style={{ fontSize: "30px" }} /> </a> :
                    <button className="add-to-cart-button" type="submit" onClick={handleSubmit}>Add to Your Cart</button>}
                </div>
                :
                <div className="single-product-add-to-cart-button">
                  <i className="fa fa-user" style={{ fontSize: "30px" }} />
                  <LoginModal name="login" />
                  <p>Favorite</p>
                </div>
              }


              {user ?
                <>
                  {isF ?
                    <div className="single-product-add-to-cart-button d-flex">
                      <p className="blue" style={{ fontSize: 'small' }}> محصول در لیست شما است </p> &nbsp;
                      <p className="text-danger" style={{ fontSize: 'small' }} id="c-p" onClick={handleFavorite}> / حذف</p>

                      {/* <button className="add-to-list-button"> */}
                      {/* <FaHeart color="red" /> */}
                      {/* </button> */}
                    </div>
                    :
                    // <div className="single-product-add-to-cart-button" id="ac">
                    // <p style={{ color: 'blue', fontSize:'small'}}>افزودن به لیست من</p>
                    <button className="add-to-list-button" style={{ fontSize: 'small', backgroundColor: 'white' }} onClick={handleFavorite}>مورد علاقه <FaHeart color="black" /></button>
                    // </div>
                  }
                </>
                :
                <div className="single-product-add-to-cart-button">
                  <p>افزودن به لیست<br></br> علاقه مندی ها</p>
                  <i className="fa fa-heart" style={{ fontSize: "30px" }} >
                    <LoginModal name="single-product-like" />
                  </i>
                </div>
              }



            </div>





          </div>





        </div>
        {/* END OF THE MAIN ------------------------------------------------------------------------------------------ */}








        {/* here outside of the main - this is the next line - hidden stuff (shoe more) */}
        <div className="container-fluid">
          {showMore ? <p id="c-p" onClick={() => setShowMore(false)} ><FaAngleUp />Close</p> : <p className="blue single-product-show-more" onClick={() => setShowMore(true)}>See more detail</p>}
        </div>



        {showMore && productState.category === 'یخچال و فریزر' &&

          <div id='d-g' className="single-product-text-align p-5">
            {productState.description.map(ev => (
              <div key={ev.title}>
                <h5>{ev.title}</h5>
                <p>{ev.detail}</p>
              </div>
            ))}

            <div style={{ padding: "30px 0" }} className="border-bottom-global" />

            <h5 style={{ marginTop: '50px' }}>گنجایش یخچال</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.capacity} لیتر</p>

            {/* {productState && */}
            <div id='d-f'>
              {productState.facilities.length > 0 && <h5>امکانات یخچال</h5>}
              {productState.facilities.map(ev => (
                <div key={ev} className="p-5">
                  <p>{ev}</p>
                </div>
              ))}
            </div>
            {/* } */}

            <h5>تعداد طبقات یخچال</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.floor}</p>

            <h5>تعداد کشو</h5>
            <p className="p-3" style={{ marginRight: '170px' }}> {productState.drawer} عدد</p>

            {productState.opening_side && <h4> جهت باز شدن درب یخچال</h4>}
            <p className="p-3" style={{ marginRight: '170px' }}> {productState.opening_side}</p>

            <div style={{ padding: "30px 0" }} className="border-bottom-global" />
          </div>
        }






        {showMore && productState.category === 'ماشین ظرفشویی' &&

          <div id='d-g' className="single-product-text-align p-5">

            <div style={{ padding: "30px 0" }} className="border-bottom-global" />

            <h5 style={{ marginTop: '50px' }}>وزن</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.weight} گرم</p>


            <h5 style={{ marginTop: '50px' }}>ارتفاع</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.height} سانتی‌متر</p>

            <h5 style={{ marginTop: '50px' }}>ویژگی‌ها</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.feature} </p>

            <h5 style={{ marginTop: '50px' }}>عمق</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.depth} سانتی‌متر</p>

            <h5 style={{ marginTop: '50px' }}>شناسه</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{productState.index} </p>

          </div>
        }






















        {/* MEN AND REVIEW / THE LAST THINGS IN THE PAGE */}
        {/* men  */}
        <p style={{ paddingTop: "10px", paddingBottom: "10px", marginLeft: "30px", }} className="border-bottom-global" />

        <div id="t-a-c">
          <img src={productState.images.special} alt="" width="80%" />
        </div>

        <div className="m-4">
          <h5>Product Description</h5>
          {/* <p style={{ paddingBottom: "10px", marginLeft: "30px", }} className="border-bottom-global">This product is really awesome and some details will be here soon..</p> */}


          <h4>Product Details</h4>
          <div style={{ paddingBottom: "10px", marginLeft: "30px", }} className="border-bottom-global" >

            {/* <div className="d-flex">
              <h6 >Product Dimensions &nbsp;:</h6>&nbsp;
              <p>14.6 x 11.15 x 3.45 inches, 15.52 Ounces </p>
            </div>
            <div className="d-flex">
              <h6 >Product Dimensions &nbsp;:</h6>&nbsp;
              <p>14.6 x 11.15 x 3.45 inches, 15.52 Ounces </p>
            </div>
            <div className="d-flex">
              <h6 >Product Dimensions &nbsp;:</h6>&nbsp;
              <p>14.6 x 11.15 x 3.45 inches, 15.52 Ounces </p>
            </div> */}

          </div>

          <div style={{ padding: "30px 0" }} className="border-bottom-global" >
            <h4>گزارش مشکل </h4>
            <div className="d-flex">
              <p>برای گزارش مشکل یرای این محصول لطفا اینجا</p>
              <p className="text-info" id="c-p">, کلیک کنید .</p>
            </div>
          </div>
          <div className="d-flex" style={{ marginTop: "40px" }}>




            {/* customer views and  person images  */}
            <div className="single-product-review-images">
              <div>
                {/* // boooooooooooo */}
                <h4> نظر خریداران</h4>
                <div className="d-flex">
                  <ReactStars count={5} size={25} activeColor="#ffd700" value={star} edit={false} />
                </div>
                <input type="range" defaultValue={star} />
                <p>{rate.length} نظر ثبت شده</p>
                <div className="blue">

                  {/* <p style={{ color: 'yellow', marginRight: '10px' }}> <Rating size="20" initialValue={star} onClick={(ev) => starHandler(ev.target.value)} /> </p> <h6>{star} از 5</h6> */}
                  <div className="d-flex">
                    <p>{star} امتیاز</p>
                    <div className="front" />
                    <div className="back" />
                    <p>{percent}%</p>
                  </div>


                  {/* <div className="d-flex">
                  <p>4 star</p>
                  <div className="front" />
                  <div className="back" />
                  <p>62%</p>
                </div>
                <div className="d-flex">
                  <p>3 star</p>
                  <div className="front" />
                  <div className="back" />
                  <p>42%</p>
                </div>
                <div className="d-flex">
                  <p>2 star</p>
                  <div className="front" />
                  <div className="back" />
                  <p>12%</p>
                </div>
                <div className="d-flex">
                  <p>1 star</p>
                  <div className="front" />
                  <div className="back" />
                  <p>6%</p>
                </div> */}
                </div>

              </div>

              <div className="col single-product-person-images">

                <div className="between">
                  <h4>Review with images</h4>
                  <p className="blue">See all photos</p>
                </div>
                <div className="align" style={{ borderBottom: "1px solid grey", paddingBottom: "30px" }}>
                  <i className="fa fa-arrow-left" />
                  <div className="test">
                    {productState.images.others.map(ev => (
                <Zoom><img alt="person" src={ev} className="personal-images"/></Zoom>
                    ))}
                  </div>
                  {/* <img src={person1} className="person-image" /> */}
                  <i className="fa fa-arrow-right" />
                </div>
                <div style={{ fontSize: "10px", padding: "20px 0" }}>



                  <select style={{ width: "fit-content", height: 'fit-content' }}>
                    <option>Top reviews</option>
                  </select>

                </div>

              </div>
            </div>


          </div>


          {/* REVIEW - GIVING STARS - THE LAST SECTION IN THE PAGE */}






          {/* DESCRIPTION */}
          <section className="py-5 home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <h3>توضیحات</h3>
                <div className="col-12 description py-4">
                  {/* <p>{description}</p> */}
                  <p>A really good something</p>
                </div>
              </div>
            </div>
          </section>

          {/* REVIEW */}

          <section className="col-12" id="review" >
            <div className="container-xxl" >
              <div className="row">
                <h3>نظرات</h3>
                <div className="review" >
                  <div className=" d-flex justify-content-between align-items-end py-2" >
                    <div >
                      <h6 className="mb-0">Customer Reviews</h6>
                      <div className="d-flex align-items-center gap-10"  >
                        <ReactStars
                          count={5}
                          size={25}
                          activeColor="#ffd700"
                          value={star}
                          edit={false}
                        />
                        <p className="mb-0">Based on 2 Reviews</p>
                      </div>
                    </div>
                    {/* {orderProduct && ( */}
                    <div>
                      <a href="/" className="text-dark">
                        Write a Review
                      </a>
                    </div>
                    {/* )} */}
                  </div>
                  <div>
                    <p>Write a Review.</p>
                    <form className="d-flex flex-column">
                      <ReactStars
                        count={5}
                        size={44}
                        activeColor="#ffd700"
                        value={0}
                        onChange={(ev) => starHandler(ev)}
                      />
                      <textarea
                        placeholder="نظر خود را ثبت کنید  ..."
                        cols="30"
                        rows="10"
                        className="w-100 form-control"
                        onClick={() => setReviewErr('')}
                        ref={reviewRef}
                      ></textarea>
                      <div className="d-flex justify-content-end" id="a-c">
                        <p className="text-danger">{reviewErr}</p>
                        <button className="button" onClick={reviewHandler}> Submit Review</button>
                      </div>
                    </form>
                    {productState.review.map(ev =>
                      <div key={Math.random()}>
                        <div className="d-flex align-items-center gap-10">
                          <h6 className="mb-0">{ev.userName}</h6>
                          <ReactStars count={5} size={24} activeColor="#ffd700" value={ev.rating} edit={false} />
                        </div>
                        <p className="grey" style={{ overflow: 'hidden', width: "270px" }}>
                          {ev.review}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* SOME PRODUCT  */}
          <section className="popular-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <h3 className="section-heading py-4">محصولات مشابه</h3>
                </div>
              </div>

              <div className="product-card-body">
                  <ProductCard
                    key={productState._id}
                    id={productState._id}
                    name={productState.name}
                    price={productState.price}
                    images_title={productState.images.title}
                    images_others={productState.images.others}
                    color={productState.color}
                  />
              </div>

            </div>
          </section>









        </div>

        <ToastContainer />


      </div>


    </div>

  );
}

export default SingleProduct;



