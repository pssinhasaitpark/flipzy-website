import React from 'react';
import { logo } from "../../assets/index";
import { FaSearch } from "react-icons/fa";
const HeaderSeeAll = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
           <img
                     src={logo}
                     height="45"
                     className="d-inline-block align-top"
                     alt="Logo"
                   />
        </a>
        <form className="flex-grow-1 mx-lg-3 mx-0 mt-2 position-relative">
          <input
            className="form-control me-2 rounded-pill bg-light search-all"
            type="search"
            placeholder="Search for anything"
            aria-label="Search"
            // style={{ width: '1500px' }}
          />
             <span className="position-absolute  search-bar ">
                          <FaSearch  size={20} className='mx-2'/>
                        </span>
        </form>
        <button className="btn" style={{fontWeight:"800"}} type="button">
          Get the app
        </button>
      </div>
          
    </nav>
 
 
  );
};

export default HeaderSeeAll;
