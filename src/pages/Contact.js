import { BiPhoneCall, BiInfoCircle, BiLogoLinkedin } from "react-icons/bi";
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";

function Contact() {
  return (
    <>
      <div className="contact-wrapper-main py- home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3240.8881248802777!2d51.4179432!3d35.6797566!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1705086939686!5m2!1sen!2sus"
              width="600"
              height="450"
              title="location"
              // style="border:0;"
              className="border-0"
              // allowfullscreen=""
              loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>


<h1>vah*d7362@gmail.com 9304037169</h1>

            <div className="col-12">
              <div className="contact-wrapper d-fle justify-content-between">
                <div>
                  <h3 className="contact-title">ارتباط با ما</h3>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="نام"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ایمیل"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="شماره همراه "
                      />
                    </div>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <button className="button"> تایید</button>
                  </form>
                </div>
                <div className="">
                  <h3 className="contact-title mb-5">با ما در ارتباط باشید</h3>
                  <ul className="ps-0">
                    <li className="fs-5 d-flex align-items-center mb-3 gap-10">
                      <AiOutlineHome className="fs-5 mb-3" />
                      <address>
                        تهران, خیابان جمهوری,
                        ابتدای کاخ گلستان.
                      </address>
                    </li>

                    {/* <li className="fs-5 d-flex gap-10">
                      <BiPhoneCall className="mb-0" />
                      <p>0210015021</p>
                    </li>

                    <li className="fs-5 d-flex align-items-center mb-3 gap-10">
                      <AiOutlineMail className="" />
                      <a href="kasan@gmail.com"> kasan@gmail.com</a>
                    </li> */}

                    <li className="fs-5 d-flex align-items-center mb-3 gap-10">
                      <BiInfoCircle className="" />
                      {/* <p className="mb-0">Monday Friday 10 AM 7 PM</p> */}
                      <p className="mb-0">ارتباط حضوری: شنبه تا بنج شنبه ۸ تا ۱۲</p>
                    </li>
                  </ul>

                  <ul className="py-5">

                  <li className="fs-5 d-flex align-items-center mb-3 gap-10">
                      <AiOutlineHome className="fs-5 mb-3" />
                      <address>
                      توسعه دهنده وبسایت
                      </address>
                    </li>

                    <li className="fs-5 d-flex gap-10">
                      <BiInfoCircle className="mb-0" />
                      <p> مهدی کرامتی - برنامه نویس </p>
                    </li>

                  <li className="fs-5 d-flex gap-10">
                      <BiPhoneCall className="mb-0" />
                      <p>09210015021</p>
                    </li>

                    <li className="fs-5 d-flex align-items-center mb-3 gap-10">
                      <AiOutlineMail className="" />
                      <a href="mettihew@gmail.com"> mettihew@gmail.com</a>
                    </li>
                    <li className="fs-5 d-flex align-items-center mb-3 gap-10">
                      <BiLogoLinkedin />
                      <a href="https://www.linkedin.com/in/mahdi-keramati-52211a257">Mahdi Keramati </a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
