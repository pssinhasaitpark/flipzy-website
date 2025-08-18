import React from "react";
import { logo } from "../../assets/index";
import { FaSearch, FaBars } from "react-icons/fa";

const HeaderSeeAll = ({ onShowFilter }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="container-fluid">
        <div
          className="d-flex align-items-center w-100"
          style={{ minHeight: "60px" }}
        >
          {/* Logo - fixed width */}
          <a
            className="navbar-brand flex-shrink-0 me-2"
            href="/"
            style={{ minWidth: "auto" }}
          >
            <img
              src={logo}
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </a>

          {/* Search form - takes remaining space */}
          <form
            className="flex-grow-1 position-relative mx-2"
            style={{ minWidth: "150px", maxWidth: "calc(100% - 120px)" }}
          >
            <input
              className="form-control rounded-pill bg-light search-all w-100"
              type="search"
              placeholder="Search for anything"
              aria-label="Search"
              style={{
                paddingRight: "45px",
                fontSize: "14px",
                height: "40px",
              }}
            />
            <span
              className="position-absolute search-bar"
              style={{
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <FaSearch size={16} />
            </span>
          </form>

          {/* Right side buttons - absolutely fixed width */}
          <div className="flex-shrink-0" style={{ minWidth: "50px" }}>
            {/* Hamburger on small/medium screens */}
            <button
              className="btn d-lg-none p-2"
              style={{
                background: "transparent",
                boxShadow: "none",
                border: "none",
                outline: "none",
                fontSize: "24px",
                color: "#111",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={onShowFilter}
              aria-label="Open Filters"
            >
              <FaBars />
            </button>

            {/* "Get the app" button shown only on large screens */}
            <button
             onClick={() => window.open("https://play.google.com/store/apps/details?id=com.freeupapp.freeup&pli=1")}
              className="btn d-none d-lg-block px-3"
              style={{
                fontWeight: "800",
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
              type="button"
            >
              Get the app
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSeeAll;