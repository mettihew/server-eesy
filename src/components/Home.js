import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import digi_banner from '../images/digi_banner.gif'
import watch from '../images/watch.jpg'
import tv from '../images/tv.jpg'
import headphone from '../images/headphone.jpg'
import camera from '../images/camera.jpg'
import brand1 from '../images/brand-01.png'
import brand2 from '../images/brand-02.png'
import brand3 from '../images/brand-03.png'
import brand4 from '../images/brand-04.png'
import brand5 from '../images/brand-05.png'
import brand6 from '../images/brand-06.png'
import brand7 from '../images/brand-07.png'
import brand8 from '../images/brand-08.png'
import axios from 'axios'
import { FaAngleDoubleRight } from "react-icons/fa";
import { URL } from "../utils/URL";


function Home() {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.products);
  const [refrigerator, setRefrigerator] = useState()
  const [dishwasher, setDishwasher] = useState()
  const [microwave, setMicrowave] = useState()

  useEffect(() => {
    axios.post(`${URL}/product/home-cat`, {category:'refrigerator'})
    .then((res) => setRefrigerator(res.data))
    
    axios.post(`${URL}/product/home-cat`, {category:'dishwasher'})
    .then((res) => setDishwasher(res.data))
    
    axios.post(`${URL}/product/home-cat`, {category:'microwave'})
    .then((res) => setMicrowave(res.data))
  }, []);
console.log(dishwasher);

  return (
    <>
      <section className="gray home">
        {/* DIGI BANNER IMAGE */}
        <img src={digi_banner} className="body-banner rounded-3 py-2 " alt="main banner" />
      </section>

      <section className="gray container-fluid" style={{ overflow: "scroll", width: "100%" }}>
        <div className="categories">
          <a href="/categories" className="d-flex align-items-center gap-10" id="no-a">
            <img src={"https://dkstatics-public.digikala.com/digikala-products/3a7b568fd437b77be10fb952ea8684540128c67d_1662275830.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"} alt='services' width="100px" />
            <div>
              <h6>یخچال و فریزر</h6>
              <p>ارسال سریع روزهای کاری</p>
            </div>
          </a>

          <a href="/categories" className="d-flex align-items-center gap-10" id="no-a">
            <img src={"https://dkstatics-public.digikala.com/digikala-products/6ee2bdf01852e97b46b9a01be7a1465e5714bcee_1702881396.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90"} alt='services' width="100px" />
            <div>
              <h6>ماشین ظرفشویی</h6>
              <p>تخفیف فصل</p>
            </div>
          </a>

          <a href="/categories" className="d-flex align-items-center gap-10" id="no-a">
            <img src={tv} alt="Services" />
            <div>
              <h6>ارسال سریع</h6>
              <p>محصولات بالای ده ملیون تومن</p>
            </div>
          </a>

          <a href="/categories" className="d-flex align-items-center gap-10" id="no-a">
            <img src={tv} alt="Services" />
            <div>
              <h6>ارسال سریع</h6>
              <p>محصولات بالای ده ملیون تومن</p>
            </div>
          </a>
          
          </div>
          </section>




          {/* ------------------------------------------------------------------- */}


          {/* -------------------------------------------------------------------- */}


{refrigerator &&
      <section className="container-fluid py-4 gray">
        <h3 className="py-4">Refrigerators</h3>

<div className="d-flex" id="j-c">

        <div className="product-card-body">
          {refrigerator?.map((ev) => (
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

        <a href="/category?cat=refrigerator"><FaAngleDoubleRight size="40px"/> </a>
</div>

      </section>
}


{dishwasher &&
      <section className="container-fluid py-4 gray">
        <h3 className="py-4">Dishwashers</h3>

        <div className="product-card-body">
          {dishwasher?.map((ev) => (
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


{microwave &&
      <section className="container-fluid py-4 gray">
        <h3 className="py-4">Microwaves</h3>

        <div className="product-card-body">
          {microwave?.map((ev) => (
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
        <a href="/category?cat=microwave"><FaAngleDoubleRight size="40px"/> </a>
        </div>
      </section>
    }



      <section className="gray container-fluid">
        <h3 className="py-4">Best seller</h3>
        <div className="product-card-body">
          {productState?.map((ev) => {
            if (ev.best_seller) {
              return (
                <ProductCard
                  key={ev._id}
                  id={ev._id}
                  name={ev.name}
                  price={ev.price}
                  images_title={ev.images.title}
                  images_others={ev.images.others}
                  color={ev.color}
                  rating={ev.rating}
                  review={ev.review}
                />
              );
            }
          })}
        </div>
      </section>



      <section className="gray py-4">
      <div className="brands-img">
    <img src={brand1} width={"90px"} />
    <img src={brand2} width={"90px"} />
    <img src={brand3} width={"90px"} />
    <img src={brand4} width={"90px"} />
    <img src={brand5} width={"90px"} />
    <img src={brand6} width={"90px"} />
    <img src={brand7} width={"90px"} />
    <img src={brand8} width={"90px"} />
    </div>
      </section>


    </>
  );
}

export default Home;
