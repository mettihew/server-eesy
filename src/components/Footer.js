import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsYoutube, BsInstagram, BsGithub } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";


function Footer() {
  return (
    <>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="around">
            <div className="d-flex gap-10 align-items-center"><MdOutlineEmail size={"25px"}/><h6 className="mb-0 text-white">Stay in Contact </h6></div>
            <div id="d-f"><input className="form-control py-" placeholder="Enter your email"/><button>Send</button></div>
          </div>
        </div>
      </footer>


  {/* --- contact information Account  Quick */}
      <footer className="py-4">
        <div className="container-xxl d-flex">


          <div className="col-3">
          <h4 className="text-white mb-4">Contact Us</h4>
          <p className="text-white"> metthew@gmail.com</p>
          <div className="social-icons d-flex align-items-center gap-30 ">
            <p className="text-white">
              <BsGithub className="fs-4" />
            </p>
            <p className="text-white">
              <BsLinkedin className="fs-4" />
            </p>
            <p className="text-white">
              <BsInstagram className="fs-4" />
            </p>
            <p className="text-white">
              <BsYoutube className="fs-4" />
            </p>
          </div>
          </div>

          <div className="col-3">
            <h4 className="text-white mb-4">Information</h4>
            <div className="footer-links d-flex flex-column">
              <Link to="/refund-policy" className="text-white py-2 mb-1">
                Returned Policy
              </Link>
              <Link to="/privacy-policy" className="text-white py-2 mb-1">
                Privacy Policy
              </Link>
              <Link to="/shipping-policy" className="text-white py-2 mb-1">
                Shipping Policy
              </Link>
              <Link to="/term-conditions" className="text-white py-2 mb-1">
                Terms & Conditions
              </Link>
              <Link to="/" className="text-white py-2 mb-1">
                Blogs
              </Link>
            </div>
          </div>

          <div className="col-3">
            <h4 className="text-white mb-4">Account</h4>
            <div className="footer-links d-flex flex-column">
              <Link className="text-white py-2 mb-1">About Us</Link>
              <Link className="text-white py-2 mb-1">Faq</Link>
              <Link className="text-white py-2 mb-1">Contact</Link>
              <Link className="text-white py-2 mb-1">Call</Link>
            </div>
          </div>

          <div className="col-3">
            <h4 className="text-white mb-4">Quick Links</h4>
            <div className="footer-links d-flex flex-column">
              <Link className="text-white py-2 mb-1">Laptops</Link>
              <Link className="text-white py-2 mb-1">Headphones</Link>
              <Link className="text-white py-2 mb-1">Tablets</Link>
              <Link className="text-white py-2 mb-1">Watch</Link>
            </div>
          </div>
        </div>
      </footer>




         {/* --------- powered by Mettihew */}
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by Mettihew
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
