import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="flex flex-col justify-around ">
      <div className="flex flex-row justify-around border-y-2 py-2">
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">Newsletter</h2>
            <p className="text-gray-500">
              Be the first to hear about new products, <br />
              exclusive events, and online offers.
            </p>
            <p>Sign up and ge t 10% off your first order.</p>
            <form className="flex border-2 border-gray-400">
              <input
                type="email"
                placeholder="Enter your mail"
                className="flex-1 px-3 py-2 outline-none"
              />
              <button className="bg-black text-white px-4">Subscribe</button>
            </form>
          </div>

          <div className="flex flex-col ">
            <h1 className="mb-2 font-semibold">Shop</h1>
            <div className="flex flex-col ">
              <Link to="/">Men's Top Wear</Link>
              <Link to="/">Women's Top Wear</Link>
              <Link to="/">Men's Bottom Wear</Link>
              <Link to="/">Women's Bottom Wear</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-56">
          <div>
            <h1 className="mb-2 font-semibold">Support</h1>
            <div className="flex flex-col ">
              <Link to="/">Contact Us</Link>
              <Link to="/">About Us</Link>
              <Link to="/">FAQs</Link>
              <Link to="/">Feartures</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Follow Us</h1>
            <div className="flex flex-row gap-4">
              <a href="#" className="text-black text-[20px]">
                <FaFacebook />
              </a>
              <a href="#" className="text-black text-[20px]">
                <FaTiktok />
              </a>
              <a href="#" className="text-black text-[20px]">
                <FaInstagram />
              </a>
            </div>
            <div>
              <h1>Call Us</h1>
              <a href="#" className="text-black text-[15px] flex flex-row">
                <FiPhone /> <p className=" text-[15px]">+84 0982708523</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Thuy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
