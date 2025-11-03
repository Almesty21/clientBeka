import { Link, useLocation } from "react-router-dom";

// Define prop types
interface NavlinkProps {
  toggleNavbar?: () => void;
}

// Define link type
interface LinkItem {
  path: string;
  label: string;
  icon?: string;
}

const NavLink: React.FC<NavlinkProps> = ({ toggleNavbar }) => {
  const location = useLocation();
  
  const links: LinkItem[] = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/blog", label: "Blog" },
    { path: "/product", label: "Product" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
  ];

  const handleClick = () => {
    if (toggleNavbar) {
      toggleNavbar();
    }
  };

  return (
    <>
      {links.map((link, index) => {
        const isActive = location.pathname === link.path;
        
        return (
          <Link
            key={index}
            to={link.path}
            onClick={handleClick}
            className={`
              relative text-lg font-semibold py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer
              group
              ${isActive 
                ? 'text-orange-500' 
                : 'text-gray-700'
              }
            `}
          >
            {link.label}
            
            {/* Hover indicator circle above text */}
            <div className={`
              absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full 
              transition-all duration-300 opacity-0 group-hover:opacity-100
              ${isActive ? 'hidden' : ''}
            `}></div>
          </Link>
        );
      })}
    </>
  );
};

export default NavLink;