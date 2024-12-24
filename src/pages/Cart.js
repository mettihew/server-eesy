import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { URL } from "../utils/URL";
import empty from "../images/amazon-breakfast.svg";
import { Button } from "react-bootstrap";

function Cart() {
  const [data, setData] = useState();
  const [history, setHistory] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return (window.location.href = "/login");

    // CART
    const uId = user._id;
    axios
      .post(`${URL}/get-cart`, { uId })
      .then((res) => setData(res.data))
      .catch((er) => alert(er));

    // HISTORY
    const history = user.history;
    axios
      .post(`${URL}/get-history`, { history })
      .then((res) => setHistory(res.data));
  }, []);
  if (!data)
    return (
      <div id="j-c">
        {" "}
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSItLWFuaW1hdGlvbi1zdGF0ZTogcnVubmluZzsiPgogICAgICA8c3R5bGU+CiAgICAgICAgOnJvb3QgewogICAgICAgICAgLS1hbmltYXRpb24tc3RhdGU6IHBhdXNlZDsKICAgICAgICB9CgogICAgICAgIC8qIHVzZXIgcGlja2VkIGEgdGhlbWUgd2hlcmUgdGhlICJyZWd1bGFyIiBzY2hlbWUgaXMgZGFyayAqLwogICAgICAgIDpyb290IHsKICAgICAgICAgIC0tcHJpbWFyeTogI2Y5ZmJmYTsKICAgICAgICAgIC0tc2Vjb25kYXJ5OiAjMDAxZTJiOwogICAgICAgICAgLS10ZXJ0aWFyeTogIzAwZWQ2NDsKICAgICAgICAgIC0taGlnaGxpZ2h0OiAjMDAxZTJiOwogICAgICAgICAgLS1zdWNjZXNzOiAjMDBlZDY0OwogICAgICAgIH0KCiAgICAgICAgLyogdGhlc2Ugc3R5bGVzIG5lZWQgdG8gbGl2ZSBoZXJlIGJlY2F1c2UgdGhlIFNWRyBoYXMgYSBkaWZmZXJlbnQgc2NvcGUgKi8KICAgICAgICAuZG90cyB7CiAgICAgICAgICBhbmltYXRpb24tbmFtZTogbG9hZGVyOwogICAgICAgICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7CiAgICAgICAgICBhbmltYXRpb24tZHVyYXRpb246IDNzOwogICAgICAgICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7CiAgICAgICAgICBhbmltYXRpb24tcGxheS1zdGF0ZTogdmFyKC0tYW5pbWF0aW9uLXN0YXRlKTsKICAgICAgICAgIHN0cm9rZTogI2ZmZjsKICAgICAgICAgIHN0cm9rZS13aWR0aDogMC41cHg7CiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7CiAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgcjogbWF4KDF2dywgMTFweCk7CiAgICAgICAgICBjeTogNTAlOwogICAgICAgICAgZmlsdGVyOiBzYXR1cmF0ZSgyKSBvcGFjaXR5KDAuODUpOwogICAgICAgICAgZmlsbDogdmFyKC0tdGVydGlhcnkpOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDIpIHsKICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4xNXM7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoMykgewogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzOwogICAgICAgIH0KCiAgICAgICAgLmRvdHM6bnRoLWNoaWxkKDQpIHsKICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC40NXM7CiAgICAgICAgfQoKICAgICAgICAuZG90czpudGgtY2hpbGQoNSkgewogICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjZzOwogICAgICAgIH0KCiAgICAgICAgQGtleWZyYW1lcyBsb2FkZXIgewogICAgICAgICAgMCUgewogICAgICAgICAgICBvcGFjaXR5OiAwOwogICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOwogICAgICAgICAgfQogICAgICAgICAgNDUlIHsKICAgICAgICAgICAgb3BhY2l0eTogMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOwogICAgICAgICAgfQogICAgICAgICAgNjUlIHsKICAgICAgICAgICAgb3BhY2l0eTogMTsKICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpOwogICAgICAgICAgfQogICAgICAgICAgMTAwJSB7CiAgICAgICAgICAgIG9wYWNpdHk6IDA7CiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICA8L3N0eWxlPgoKICAgICAgPGcgY2xhc3M9ImNvbnRhaW5lciI+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjMwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNDB2dyIvPgogICAgICAgIDxjaXJjbGUgY2xhc3M9ImRvdHMiIGN4PSI1MHZ3Ii8+CiAgICAgICAgPGNpcmNsZSBjbGFzcz0iZG90cyIgY3g9IjYwdnciLz4KICAgICAgICA8Y2lyY2xlIGNsYXNzPSJkb3RzIiBjeD0iNzB2dyIvPgogICAgICA8L2c+CiAgICA8L3N2Zz4="
          alt="loading"
        />{" "}
      </div>
    );

  const map = data?.map((ev) => (
    <a href={`/product/${ev._id}`} key={ev._id}>
      {ev.best_seller ? (
        <div className="best-seller-orange">
          <p id="abs" className="best-seller-orange-text">
            Best Seller
          </p>
        </div>
      ) : (
        <div className="best-seller-orange-none" />
      )}

      <div style={{ borderRadius: !ev.best_seller ? "10px 10px 0 0" : "" }}>
        <div className="d-flex">
          <img
            src={ev.images.title}
            style={{ borderRadius: !ev.best_seller ? "10px 10px 0 0" : "" }}
          />
          <div className="d-grid">
            <h6>{ev.name}</h6>
            <div className="d-flex">
              <h6 className="text-warning">
                &#9733;&#9733;&#9733;&#9733;&#9733;&#9734;
              </h6>
              <p className="text-primary">34.4</p>
            </div>
            <p className="grey">100+ bought in past month</p>
            <div className="d-flex">
              <p>$</p>
              <h1>{ev.price}</h1>
            </div>
            <p>{ev.category}</p>
            <p>{ev.brand}</p>
          </div>
        </div>
      </div>
    </a>
  ));

  return (
    <div className="container-fluid" id="between">
      {map}

      {data?.length === 0 && (
        <div id="j-c">
          <img src={empty} width={"350px"} alt="empty" />
          <div id="d-g">
            <h4>Your Cart is empty</h4>
            <a href="/products">See products</a>
            <span className="cart-button">Sign in to your account</span>
          </div>
        </div>
      )}

      {history && (
        <div>
          {history?.map((ev) => (
            <ProductCard
              key={ev._id}
              id={ev._id}
              name={ev.name}
              price={ev.price}
              images_title={ev.images.title}
              images_others={ev.images.others}
              color={ev.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Cart;
