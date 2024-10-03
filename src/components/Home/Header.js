import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#home",
  },
  {
    id: 2,
    name: "About",
    link: "/#about",
  },
  {
    id: 3,
    name: "Services",
    link: "/#services",
  },
  {
    id: 4,
    name: "Explore",
    link: "/#explore",
  },
]


function Header() {
    return (
      // Make it so that the navbar comes down when scrolling down 
      //(className="fixed w-full" solves that but the navlinks aren't clickable)
      <div className="bg-blue-600">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="container py-3 md:py-2 ">
              <div className="flex justify-between items-center ">
                {/* Logo Section */}
                <div>
                  <a href="#" className="flex items-center"> 
                    <img src={Logo} alt="Logo" className="w-14"/>
                    <span className="text 2xl sm:text-3xl font-semibold text-white">SmartSympto</span>
                  </a>
                </div>

                {/* NavLinks Section */}
                <div>
                  <ul className="flex items-center gap-8 ml-400">
                    { 
                        MenuLinks.map(({id, link, name}) => {
                          return(
                            <li key={id} className="cursor-pointer py-4">
                              <a href={link} className=" text-white text-lg font-medium 
                                 hover:text-blue-400 py-2 hover:border-b-2 hover:border-blue-400">{name}</a>
                            </li>
                      ); })}
                    <li>
                      <Link to="/signup" className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Get Started
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </nav>
      </div>
    );
};

export default Header;