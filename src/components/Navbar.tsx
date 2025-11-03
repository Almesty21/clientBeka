import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpg";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import NavLink from "./NavLink";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center px-4 md:px-10 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-orange-500 shadow-lg"
              width={50}
              alt="logo"
            />
            <span className="ml-3 text-xl font-bold text-gray-800">Portfolio</span>
          </div>

          {/* Desktop Links */}
          <div className={`hidden md:flex gap-2 ${isMobile ? 'hidden' : ''}`}>
            <NavLink toggleNavbar={toggleNavbar} />
          </div>

          {/* Mobile button */}
          {isMobile && (
            <div 
              className="cursor-pointer md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-200" 
              onClick={toggleNavbar}
              aria-label="Toggle menu"
            >
              <IoMenuSharp size={28} className="text-gray-800" />
            </div>
          )}
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <div
            ref={sidebarRef}
            className={`fixed top-0 right-0 z-50 p-6 h-full w-80 bg-white shadow-2xl flex flex-col gap-6 transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center">
                <img
                  src={logo}
                  className="w-12 h-12 rounded-full border-2 border-orange-500"
                  alt="logo"
                />
                <span className="ml-3 text-lg font-bold text-gray-800">Menu</span>
              </div>
              <IoMdClose
                size={28}
                onClick={toggleNavbar}
                className="cursor-pointer text-gray-600 hover:text-orange-500 transition duration-200"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 mt-4">
              <NavLink toggleNavbar={toggleNavbar} />
            </div>

            {/* Sidebar Footer */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center">
                © 2024 Portfolio
              </p>
            </div>
          </div>
        )}
      </nav>
      
      {/* Add padding to prevent content from being hidden behind fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navbar;