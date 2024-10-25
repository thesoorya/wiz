import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "./Navbar.css";
import { StoreContext } from "../../context/Store";

const Navbar = () => {
  const [navItem, setNavItem] = useState(false);
  const [profileBtn, setProfileBtn] = useState(false);
  const { user, logoutAuth } = useContext(StoreContext)

  function handleLogout() {
    logoutAuth()
  }

  return (
    <div>
      <div className="navbar">
        <div className="logo_section">
          <div
            className="nav_ham_lines"
            onClick={() => {
              setNavItem(!navItem);
              setProfileBtn(false);
            }}
          >
            <div className="ham_line line1"></div>
            <div className="ham_line line2"></div>
            <div className="ham_line line3"></div>
          </div>
          <div className="logo_div">
            <p className="logo">Wizard</p>
          </div>
        </div>

        <div
          className="logo_img_container"
          onClick={() => {
            setProfileBtn(!profileBtn);
          }}
        >
          <p>S</p>
        </div>
      </div>

      {/*  */}

      <div
        className={`nav_links_section ${navItem ? "nav_links_section_open" : ""
          }`}
      >
        <div
          className="nav_close_btn"
          onClick={() => {
            setNavItem(!navItem);
          }}
        >
          <IoMdClose />
        </div>
        <div className="nav_items">
          <div className="nav_links">
            <Link>Home</Link>
          </div>
          <div className="nav_links">
            <Link>About Us</Link>
          </div>
          <div className="nav_links">
            <Link>Category</Link>
          </div>
          <div className="nav_links">
            <Link>Cart</Link>
          </div>
          <button className="nav_login_btn">
            {
              user ?
                (<Link to="/" onClick={handleLogout}>Logout</Link>) :
                (<Link to="/signup">Sign Up</Link>)
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
