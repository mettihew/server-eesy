import { useState, useEffect, useRef } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FaAngleRight, FaAngleUp, FaHeart } from 'react-icons/fa'
import { FaCodeCompare } from "react-icons/fa6";
import LoginModal from '../components/LoginModal'
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { URL } from "../utils/URL";
import { FaAngleDoubleRight } from "react-icons/fa";

function SingleProduct() {
  const [colorDiv, setColorDiv] = useState()
  const [showMore, setShowMore] = useState(false)
  const [colorErr, setColorErr] = useState(false)
  const location = useLocation()
  const pId = location.pathname.split("/")[2]
  const [similar, setSimilar] = useState()
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(null)
  const [inCart, setInCart] = useState()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    // GET THE PRODUCT
    if(!data){
     axios.get(`${URL}/product/${pId}`)
    .then(res => setData(res.data))
    .catch(er => alert(er))

    // IS THE PRODUCT IN MY CART?
    const user = JSON.parse(localStorage.getItem('user'))
    const uId = user._id
    axios.post(`${URL}/get-one-from-cart`, {pId, uId})
    .then(res => setInCart(res.data))
    .catch(er => alert(er))

    // MAKING HISTORY
    axios.post(`${URL}/add-history`, {pId, uId})
    .then((res) => localStorage.setItem('user', JSON.stringify(res.data)))
    }

    //similar products
    if(data){
       axios.post(`${URL}/home-cat`, {category: data.category})
      .then((res) => setSimilar(res.data))
    }
  }, [data])

  if (!data) return <div id="j-c"> <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSItLWFuaW1hdGlvbi1zdGF0ZTogcnVubmluZzsiPgogICAgICA8c3R5bGU+CiAgICAgICAgOnJvb3QgewogICAgICAgICAgLS1hbmltYXRpb24tc3RhdGU6IHBhdXNlZDsKICAgICAgICB9CgogICAgICAgIC8qIHVzZXIgcGlja2VkIGEgdGhlbWUgd2hlcmUgdGhlICJyZWd1bGFyIiBzY2hlbWUgaXMgZGFyayAqLwogICAgICAgIDpyb290IHsKICAgICAgICAgIC0tcHJpbWFyeTogI2Y5ZmJmYTsKICAgICAgICAgIC0tc2Vjb25kYXJ5OiAjMDAxZTJiOwogICAgICAgICAgLS10ZXJ0aWFyeTogIzAwZWQ2NDsKICAgICAgICAgIC0taGlnaGxpZ2h0OiAjMDAxZTJiOwogICAgICAgICAgLS1zdWNjZXNzOiAjMDBlZDY0OwogICAgICAgIH0KCiAgICAgICAgLyogdGhlc2Ugc3R5bGVzIG5lZWQgdG8gbGl2ZSBoZXJlIGJlY2F1c2UgdGhlIFNWRyBoYXMgYSBkaWZmZXJlbnQgc2NvcGUgKi8KICAgICAgICAuZG90cyB7CiAgICAgICAgICBhbmltYXRpb24tbmFtZTogbG9hZGVyOwogICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7CiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDNzOwogICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7CiAgICAgICAgICBhbmltYXRpb24tcGxheS1zdGF0ZTogdmFyKC0tYW5pbWF0aW9uLXN0YXRlKTsKICAgICAgICAgIHN0cm9rZTogI2ZmZjsKICAgICAgICAgIHN0cm9rZS13aWR0aDogMC41cHg7CiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7CiAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgcjogbWF4KDF2dywgMTFweCk7CiAgICAgICAgICBjeTogNTAlOwogICAgICAgICAgZmlsdGVyOiBzYXR1cmF0ZSgyKSBvcGFjaXR5KDAuODUpOwogICAgICAgICAgZmlsbDogdmFyKC0tdGVydGlhcnkpOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDIpIHsKICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4xNXM7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoMykgewogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDQpIHsKICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC40NXM7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoNSkgewogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjZzOwogICAgICAgIH0KCiAgICAgICAgQGtleWZyYW1lcyBsb2FkZXIgewogICAgICAgICAgMCUgewogICAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOwogICAgICAgICAgfQogICAgICAgICAgNDUlIHsKICAgICAgICAgICAgb3BhY2l0eTogMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOwogICAgICAgICAgfQogICAgICAgICAgNjUlIHsKICAgICAgICAgICAgb3BhY2l0eTogMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOwogICAgICAgICAgfQogICAgICAgICAgMTAwJSB7CiAgICAgICAgICAgIG9wYWNpdHk6IDA7CiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICA8L3N0eWxlPgoKICAgICAgPGcgY2xhc3M9ImNvbnRhaW5lciI+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjMwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNDB2dyIvPgogICAgICAgIDxjaXJjbGUgY2xhc3M9ImRvdHMiIGN4PSI1MHZ3Ii8+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjYwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNzB2dyIvPgogICAgICA8L2c+CiAgICA8L3N2Zz4=" alt="loading" /> </div>

  const addHandler = (ev) => {
    if (!colorDiv) return setColorErr(true)
    setColorDiv(ev)
    axios.post(`${URL}/add-to-cart`, { pId: data._id, uId: user._id })
    .then(res => setData(res.data))
    .catch(() => alert('we have problem adding the product'))
  }

  const removeHandler = () => {
    axios.post(`${URL}/remove-from-cart`, { pId: data._id, uId: user._id })
    .then(res => setData(res.data))
    .catch(() => alert('we have problem removing the product'))

  }

  const handleFavorite = () => {
    setLoading(true)
    axios.post(`${URL}/add-to-favorite`, { pId: data._id, userId: user._id })
    .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        window.location.reload()} )
    .catch(() => alert("somthing went wrong"))
  };

  const handleCompare = () => {
    setLoading(true)
    axios.post(`${URL}/add-to-compare`, { pId: data._id, userId: user._id })
    .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        window.location.reload()} )
    .catch(() => alert("somthing went wrong"))
  };

  let fav = user?.favorite?.find(ev => {
    return ev === pId
      })

  let com = user?.compare?.find(ev => {
    return ev === pId
      })
      

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
          <a href={`/products/${data.category}`} >{data.category}</a>
          <FaAngleRight color="gray" size="12px" />
        </div>

        {/* MAIN ----------------------------------------------------------------------------------------------------------- */}
        <div className="single-product-body">

          {/* 3 - images */}
          <div className="single-product-images">
              <Zoom><img alt="title" src={data.images.title} width={"340px"} /></Zoom>
            <div className="single-product-images-others-div">
              {data.images.others.map((ev, i) => (
                 <Zoom key={i}><img alt="others"src={ev} className="others"/></Zoom> 
              ))} 
            </div>
          </div>
          {/* } */}

          <div className="single-product-login-and-all-the-information">

            {/* 2 - ALL THE INFORMATION AND DETAILS ABOUT THE PRODUCT THAT YOU CAN SEE */}
            <div className="single-product-all-the-information-and-details">

              <h4 className="name-width">{data.name}</h4>
              {data.en_name && <p className="name-width">{data.en_name}</p>}

              <div className="blue">
                <p> برند  : {data.brand} </p>

                <div id="a-c">
                  <p style={{ color: 'yellow', marginRight: '5px' }}></p>
                </div>
                {/* <p> - {rate.length} نظر دهی</p> */}

                <p className="border-bottom-global" >
                  | 32 answered questions
                </p>
              </div>
              <div>
                <p>  قیمت :</p>
                <h5 className="text-danger">تومان {data.price}</h5>
              </div>
              <p>  رنگ :</p>
               {data.color.map((ev, i) => (
                <div key={i} className="d-flex" id="j-c">
                  <div onClick={() => setColorDiv(ev)} style={{ backgroundColor: ev }} className="single-product-color" />
                  <p>{ev}</p>
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
              {/* <p>{data[0]?.description}</p> */}
              <p>{data.feauture}</p>
            </div>

            {/* the end of the single-product-login-and-all-the-information" */}

            {/* 1 - LOGIN  */}

            <div className="single-product-add-to-cart-favorite">

              {user ?
                <div className="single-product-add-to-cart-button">
                  {(!colorDiv) && !colorErr && <p>Select color first</p>}
                  {colorErr && !colorDiv && <p className="text-danger">Select color first</p>}
                  {(colorDiv) && <p className="text-success">Order</p>}
                 {inCart ? 
                 <div id="j-c">
                  <button onClick={removeHandler} style={{width:'40px'}}>-</button>
                  <h1>{inCart?.quantity}</h1>
                  <button onClick={addHandler} style={{width:'40px'}}>+</button>
                  </div>
                 : 
                 <>
                    <button className="add-to-cart-button" type="submit" onClick={addHandler}>Add to Your Cart
                 <a href={`/cart`}> <i className="fa fa-shopping-cart" style={{ fontSize: "30px" }} /> </a> 
                    </button>
                 </>
                  }
                </div>
                :
                <div className="single-product-add-to-cart-button">
                  <i className="fa fa-user" style={{ fontSize: "30px" }} />
                  <LoginModal name="login" />
                  <p>Favorite</p>
                  <p>Favorite</p>
                  <p>Favorite</p>
                  <p>Favorite</p>
                  <p>Favorite</p>
                  <p>Favorite</p>
                  <p>Favorite</p>

                </div>
              }

              {user ?
                <>
                  {fav ?
                  // YOU HAVE THE PRODUCT
                    <div className="single-product-add-to-cart-button d-flex" id="j-c">
                      <p className="blue" style={{ fontSize: 'small' }}> In your favorite list </p> &nbsp;
                      <p className="text-danger" style={{ fontSize: 'small' }} id="c-p" onClick={handleFavorite}> / delete &nbsp;</p>

                       <button className="add-to-list-button"> 
                       <FaHeart color="red" /> 
                       </button> 
                    </div>
                    :
                  // DO NOT HAVE THE PRODUCT
                     <div className="single-product-add-to-cart-button" id="ac">
                     <p style={{ color: 'blue', fontSize:'small'}}>افزودن به لیست من</p>
                    <button className="add-to-list-button" style={{ fontSize: 'small', backgroundColor: 'white' }} onClick={handleFavorite}>Add to Favorite List <FaHeart color="black" /></button>
                     </div>
                  }
                </>
                :
                // LOGIN - NOT ADD 
                <div className="single-product-add-to-cart-button">
                  <p>Add to<br></br>Favorite List</p>
                  <i className="fa fa-heart" style={{ fontSize: "30px" }} >
                    <LoginModal name="single-product-like" />
                  </i>
                </div>
              }


{user ?
                <>
                  {com ?
                  // YOU HAVE THE PRODUCT
                    <div className="single-product-add-to-cart-button d-flex">
                      <a href="compare-product" className="blue" style={{ fontSize: 'small' }}>In Compare</a> &nbsp;
                      <p className="text-danger" style={{ fontSize: 'small' }} id="c-p" onClick={handleCompare}> / حذف</p>
                       <button className="add-to-list-button"> 
                       <FaCodeCompare color="red" /> 
                       </button> 
                    </div>
                    :
                  // DO NOT HAVE THE PRODUCT
                  <>
                  {loading ? 
                    <h1>...</h1>
                    :
                     <div className="single-product-add-to-cart-button" id="ac">
                     <p style={{ color: 'blue', fontSize:'small'}}>Add to Compare Product</p>
                    <button className="add-to-list-button" style={{ fontSize: 'small', backgroundColor: 'white' }} onClick={handleCompare}>Add to Favorite List <FaCodeCompare color="black" /></button>
                    </div>
                  }
                  </>

                  }
                </>
                :
                // LOGIN - NOT ADD 
                <div className="single-product-add-to-cart-button">
                  <p>Add to<br></br>Compare Product</p>
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

{showMore &&
          <div id='d-g' className="single-product-text-align p-5">
            <div style={{ padding: "30px 0" }} className="border-bottom-global" />

            <h5 style={{ marginTop: '50px' }}>weight</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{data.weight} weight</p>

            <h5 style={{ marginTop: '50px' }}>height</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{data.height} height</p>

            <h5 style={{ marginTop: '50px' }}>depth</h5>
            <p className="p-3" style={{ marginRight: '170px' }}>{data.depth} depth </p>
          </div>
}

        {/* MEN AND REVIEW / THE LAST THINGS IN THE PAGE */}
        {/* men  */}
        <p style={{ paddingTop: "10px", paddingBottom: "10px", marginLeft: "30px", }} className="border-bottom-global" />

        <div id="t-a-c">
          <img src={data.images.special} alt="special" width="80%" />
        </div>

        <div className="m-4">
          <h5>Product Description</h5>
          {/* <p style={{ paddingBottom: "10px", marginLeft: "30px", }} className="border-bottom-global">This product is really awesome and some details will be here soon..</p> */}

          <h4>Product Details</h4>
          <div style={{ paddingBottom: "10px", marginLeft: "30px", }} className="border-bottom-global" >

          </div>

          <div style={{ padding: "30px 0" }} className="border-bottom-global" >
            <h4>گزارش مشکل </h4>
            <div className="d-flex">
              <p>Click here to report a problem with this product</p>
              <p className="text-info" id="c-p">, کلیک کنید .</p>
            </div>
          </div>
          <div className="d-flex" style={{ marginTop: "40px" }}>

            {/* customer views and  person images  */}
            <div className="single-product-review-images">
              <div>
                {/* // boooooooooooo */}
                <h4> نظر خریداران</h4>
                {/* <p>{rate.length} نظر ثبت شده</p> */}
                <div className="blue">

                  <div className="d-flex">
                    <div className="front" />
                    <div className="back" />
                    {/* <p>{percent}%</p> */}
                  </div>
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
                    {data.images.others.map((ev,i) => (
                  <Zoom key={i} ><img alt="person" src={ev} className="personal-images"/></Zoom> 
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
                <h3>Reviews</h3>
                <div className="review" >
                  <div className=" d-flex justify-content-between align-items-end py-2" >
                    <div >
                      <h6 className="mb-0">Customer Reviews</h6>
                      <div className="d-flex align-items-center gap-10"  >
                    
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
                      <textarea
                        placeholder="Submit your review ..."
                        cols="30"
                        rows="10"
                        className="w-100 form-control"
                        // onClick={() => setReviewErr('')}
                        // ref={reviewRef}
                      ></textarea>
                      <div className="d-flex justify-content-end" id="a-c">
                        {/* <h3 className="text-danger">{reviewErr}</h3> */}
                        {/* <button className="button" onClick={reviewHandler}> Submit Review</button> */}
                      </div>
                    </form>

                    {/* {data.review.map(ev =>
                      <div key={Math.random()}>
                        <div className="d-flex align-items-center gap-10">
                          <h6 className="mb-0">{ev.userName}</h6>
                        </div>
                        <p className="grey" style={{ overflow: 'hidden', width: "270px" }}>
                          {/* {ev.review} */}
                        {/* </p> */}
                      {/* </div> */}
                    {/* )}  */}
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* SOME PRODUCT  */}
          <section className="popular-wrapper py-5 home-wrapper-2">
              {similar &&
      <section className="container-fluid py-4 gray">
       {/* {data && <h4 className="py-4">{data?.category}s</h4> } */}

        <div className="product-card-body">
          {similar?.map((ev) => (
            <ProductCard
              key={ev._id}
              id={ev._id}
              name={ev.name}
              price={ev.price}
              // description={ev.description}
              images_title={ev.images.title}
              images_others={ev.images.others}
              color={ev.color}
            />
          ))}
        </div>
        <a href="/category?cat=dishwasher"><FaAngleDoubleRight size="40px"/> </a>
      </section>
    }
</section>

            </div>
        </div>

        <ToastContainer />

      </div>
  );
}

export default SingleProduct;



