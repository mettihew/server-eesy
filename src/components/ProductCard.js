import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import view from "../images/view.svg";
import prodcompare from "../images/prodcompare.svg";
import addCart from "../images/add-cart.svg";
import { useState } from "react";
import LoginModal from './LoginModal'
import { FaHeart } from "react-icons/fa";

function ProductCard(props) {
  let location = useLocation();
  const navigate = useNavigate();
  const { grid } = props;
  const user = JSON.parse(localStorage.getItem('user'))

  const addToWishHandler = (id) => {
    // dispatch(favoriteS({ productId: id, userId: user._id }));
  };

// console.log(user.list);
  return (
    <>
      <div
        key={props._id}
        className={` ${location.pathname === "/store" ? `gr-${grid}` : ""}`}>
        <div className="product-card position-relative">
          <div className="wishlist-icon position-absolute color-danger">
            {user ?
              <Link>
                {user.list.map(ev => {
                    if (ev === props.id) {
                    return <FaHeart onClick={() => addToWishHandler(props.id)} key={Math.random()} color="red" style={{ position: "absolute", zIndex: '3'}}/>
                  } else {
                    return <FaHeart onClick={() => addToWishHandler(props.id)} key={Math.random()} className="product-card-wish-icon"/>
                  }
                })}
              </Link>
              :
              <div className="product-card-wishlist-login">
                <LoginModal name="like" />
              </div>
            }
          </div>


          <div
            className="product-image"
            onClick={() => {
              navigate(`/product/${props.id}`);
            }}
          >
            <img src={props.images_title} alt="prod watch" />
            <img src={props.images_others[1]} alt="box" />
          </div>

          <div className="product-details">
            <h5 className="brand">{props.name}</h5>

            <div id="a-c">
              {/* <p className="text-info" style={{ marginBottom: '5px' }}>{star}</p> */}
              {/* <ReactStars count={5} size={20} activeColor="#ffd700" value={star} edit={false}  /> */}
            </div>

            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}></p>
            <p>${props.price}</p>
          </div>

          <div className="action-bar position-absolute">
            <div className="d-flex flex-column my-3">
              <Link>
                <img src={prodcompare} alt="prodcompare" />
              </Link>
              <Link>
                <img src={view} alt="view" />
              </Link>
              <Link>
                <img src={addCart} alt="add-cart" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
