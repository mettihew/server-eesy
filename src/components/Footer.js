import React from "react";
import { Link } from "react-router-dom";
import {
  BsLinkedin,
  BsYoutube,
  BsInstagram,
  BsGithub,
  BsSend,
} from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { Button } from "@mui/material";

function Footer() {
  return (
    <>
      {/* Stay in contac + EMAIL  */}
      <footer className="py-3 d-grid container-xxl">
        <div className="around">
          <div className="d-flex gap-10 align-items-center">
            <MdOutlineEmail size={"25px"} />
            <h6 className="mb-0 ">Stay in Contact </h6>
          </div>
          <div id="d-f">
            <input className="form-control" placeholder="Enter your email" />
            <Button variant="contained" size="small" color="info">
              Submit <BsSend />
            </Button>
          </div>
        </div>
      </footer>

      {/* --- Contact + information + Account + Quick */}
      <footer className="footer py-3 container-xxl">
        <div className="footer-links">
          <h4>Contact Us</h4>
          <p> metthew@gmail.com</p>
          <div className="around">
            <BsGithub className="fs-4" />
            <BsLinkedin className="fs-4" />
            <BsInstagram className="fs-4" />
            <BsYoutube className="fs-4" />
          </div>
        </div>

        <div className="footer-links">
          <h4>Information</h4>
          <p> Returned Policy </p>
          <p> Privacy Policy </p>
          <p> Shipping Policy </p>
          <p> Terms & Conditions </p>
          <p> Blogs </p>
        </div>

        <div className="footer-links">
          <h4>Account</h4>
          <p>About Us</p>
          <p>Faq</p>
          <p>Contact</p>
          <p>Call</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <p> Laptops </p>
          <p> Headphones </p>
          <p> Tablets </p>
          <p> Watch </p>
        </div>
      </footer>

      {/* powered by Mettihew */}
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 ">
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
