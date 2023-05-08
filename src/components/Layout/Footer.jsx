import React from "react";
import { Link } from "react-router-dom";
import { SiShopify } from "react-icons/si";
import { BsCodeSlash } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { ImEarth } from "react-icons/im";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_top row pt-5">
        <div className="col-md-4 h-100 d-flex justify-content-center align-items-center">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "120px", width: "200px" }}
          >
            <Link
              to="/"
              className="logo d-flex justify-content-end align-items-end"
            >
              <SiShopify className="logo_icon" />
              <span>.Com</span>
            </Link>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/policy">Privacy Policy</Link>
        </div>
        <div className="col-md-4">
          <h5>
            Developer <BsCodeSlash />
          </h5>
          <div className=" d-flex flex-column">
            <Link>
              <HiOutlineMail /> ashik.swfu@outlook.com
            </Link>
            <Link to="https://dev-ashik.netlify.app/" target="_black">
              <ImEarth /> Portfolio
            </Link>
            <Link to="https://www.linkedin.com/in/dev-ashik/" target="_black">
              <AiOutlineLinkedin /> Linkedin
            </Link>
          </div>
        </div>
      </div>
      <div className="footerDown">
        <p className="text-center p-2 mb-0">All right reserved &copy; ASHIK MAHMUD</p>
      </div>
    </div>
  );
};

export default Footer;
