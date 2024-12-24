
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import favorite from "../images/wishlist.svg";
import userSVG from "../images/user.svg";
import cart from "../images/cart.svg";
import Drawer from '../components/Drawer'

function Header() {
  const [gray, setToGray] = useState("gray"); // search darker
  const user = JSON.parse(localStorage.getItem("user")); // user name
  
  const inpFocus = useRef(); //focus

  const search = window.location.search;
  let key;
  let cat;
  const arr = search.split("&");
  for (let k in arr) {
    if (arr[k].includes("k=")) key = arr[k].split("=")[1];
    if (arr[k].includes("cat=")) cat = arr[k].split("=")[1];
  }
  const [category, setCategory] = useState(cat);
  const [type, setType] = useState(key);  

  const navigate = useNavigate()
  let data;
  let search2;
  let userState = null
  if(user){
     userState = user.cart
  }
  const [tAmount, setTAmount] = useState(null);

  useEffect(() => {
    if (userState === "bla") {
      let sum = 0;
      for (let i = 0; i < 2; i++) {
        sum += userState[i].price * userState[i].quantity;
      }
      setTAmount(sum);
    }
  });

  const goHandler = (ev) => {
    ev.preventDefault();
    if (category && !type) {
      window.location.href = `/category?cat=${category}`;
    }
    if (!category && type) {
      window.location.href = `/s?k=${type}`;
    }
    if (category && type) {
      window.location.href = `/s?k=${type}&cat=${category}`;
    }
  };

  const catHandler = (ev) => {
    ev.preventDefault();
    inpFocus.current.focus();
    setCategory(ev.target.value);
  };

  if (!userState) userState = []

  return (
    <div className="header">


<div className="header-line1 py-3 container-fluid">

      {/* input */}
      <div className="header-domain-and-search">
        <div><a className="eesy" href="/" id="no-a"><h2>eesy</h2><p>خریدی آسان</p></a></div>
          <div className="input-group">

        <select className="form-select" value={category} onChange={catHandler}  >
          <option value={""}>All</option>
          <option value={"refrigerator"}>Refrigerator</option>
          <option value={"dishwasher"}>Dishwasher</option>
          <option value={"microwave"}>Microwave</option>
          <option value={"ice-maker"}>Ice Maker</option>
        </select>
       
            <input ref={inpFocus} onFocus={() => setToGray("black")} onBlur={() => setToGray("gray")} defaultValue={key} style={{ color: gray }} className="header-search-input p-2" type="text" placeholder="Search.." onChange={(ev) => setType(ev.target.value)} />
            <div className="input-group-text" onClick={goHandler}><BsSearch /></div>
          </div>
        </div>

        {/* Digitic */}

        {/* links that have icons */}
          <div className="header-link-that-have-icons">

              <a href="/compare-product"className="d-flex align-items-center gap-10 text-white"> <img src={compare} alt="compare" /><p className="mb-0 ">Compare<br /> Products</p> </a>
              {/* <a href="/favorite" className="d-flex align-items-center gap-10 text-white" > <img src={favorite} alt="favorite" /> <p className="mb-0"> Favorites </p> </a> */}
              <a href="/favorite" className="d-flex align-items-center gap-10 text-white" > <img src={favorite} alt="favorite" /> <p className="mb-0"> Favorite<br /> Your List </p> </a>
              <a href="/login" className="d-flex align-items-center gap-10 text-white"><img src={userSVG} alt="user" />

              {!user && <p className="mb-0">Log in<br /> My Account</p>}
              {user && <p className="mb-0">Welcom<br />dear, {user.name}</p>} </a>

              <a href="/cart" className="cart-img">
                <span className="badge" style={{marginBottom:'-5px', marginLeft:'8px'}}>{userState.length ? userState.length : 0}</span>
                <img src={cart} alt="cart" />
              </a>


          </div>
      </div>


      {/* LINE TWO  */}


      <div className="header-line2 container-fluid">
      <Drawer />
        <div className="header-items">
          <a href={`/products`} style={{color:'green'}}>Products</a>
          <a href={`/categories`} >Category</a>
          <a href={`/contact`}>Support</a>
        </div>
      </div>


    </div>
  );
}

export default Header;