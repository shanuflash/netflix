import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import tmdb from "../tmdb";
import supabase from "../supabase";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

function Nav({ loc }) {
  const { setUser, setEmail, setResult } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.info("Successfully logged out!");
    setUser(null);
    setEmail(null);
  };

  return (
    <div className="nav">
      <Link to="/" className="logo">
        ShowStopper
      </Link>
      <div className="user">
        {loc !== "/Search" && (
          <Link to="/Search" className="search">
            Search
            <FaSearch className="search-icon" />
          </Link>
        )}

        <div
          className="user-info"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="http://occ-0-2484-3662.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdYJV5wt63AcxNaDoqDXUhqZb55oN5Dxt1m-Zdn_z5rn_hIq9m8dA8JB2xdcPmrY3yXnlVWYKPXnOrbv2QN4aEVU28dESJg.png?r=1d4"
            alt=""
          />
        </div>

        {isOpen && (
          <div
            className="test"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/Account" className="menu-item">
              Account
            </Link>
            <div className="menu-item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
