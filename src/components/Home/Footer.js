import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import Logo from '../../assets/logo.svg';


function Footer() {
    return (
        <div data-aos="fade-up" className="bg-gray-100">
          <section className="max-w-[1200px] mx-auto">
            <div className=" grid md:grid-cols-3 py-5">
              {/* company details */}
              <div className=" py-8 px-4 ">
                <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                  <img src={Logo} alt="Logo" className="w-16" />
                  SmartSympto
                </h1>
                <p>
                  Optimized for the future of Medicare through the use of A.I. to generate personalized medical reports.{" "}
                </p>
                <br />
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Placentia, California</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+1 123-456-789</p>
                </div>
                {/* Social Handle */}
                <div className="flex items-center gap-3 mt-6">
                  <a href="#">
                    <FaInstagram className="text-3xl" />
                  </a>
                  <a href="#">
                    <FaFacebook className="text-3xl" />
                  </a>
                  <a href="#">
                    <FaLinkedin className="text-3xl" />
                  </a>
                </div>
              </div>
              {/* footer links */}
              <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
                <div className="">
                  <div className="py-8 px-4 ">
                    <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                      Names
                    </h1>
                    <ul className={`flex flex-col gap-3`}>
                      <li className="cursor-pointer">Nitesh K.</li>
                      <li className="cursor-pointer">Krish P.</li>
                      <li className="cursor-pointer">Ryan S.</li>
                      <li className="cursor-pointer">Sagar S.</li>
                    </ul>
                  </div>
                </div>
                <div className="">
                  <div className="py-8 px-4 ">
                    <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                      Contacts
                    </h1>
                    <ul className="flex flex-col gap-3">
                      <li className="cursor-pointer">+1 (510) 268-3200</li>
                      <li className="cursor-pointer">+1 (909) 621-2218</li>
                      <li className="cursor-pointer">+1 (818) 956-0977</li>
                      <li className="cursor-pointer">+1 (888) 999-2836</li>
                    </ul>
                  </div>
                </div>
                <div className="">
                  <div className="py-8 px-4 ">
                    <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                      Email Us
                    </h1>
                    <ul className="flex flex-col gap-3">
                      <li className="cursor-pointer">K.nitesh@gmail.com</li>
                      <li className="cursor-pointer">P.krish@gmail.com</li>
                      <li className="cursor-pointer">S.ryan@gmail.com</li>
                      <li className="cursor-pointer">S.sagar@gmail.com</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </section>
          <footer className="bg-blue-600 p-4 text-center text-white">
                    <p>© 2024 SmartSympto. All rights reserved.</p>
                </footer>
        </div>
      );
}

export default Footer;