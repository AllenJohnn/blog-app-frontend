import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3 mb-4">
      <Link className="navbar-brand" to="/view-all">
        BlogSystem
      </Link>
      <div className="navbar-nav me-auto">
        <Link className="nav-item nav-link" to="/create">
          Add Post
        </Link>
        <Link className="nav-item nav-link" to="/view-all">
          All Posts
        </Link>
        <Link className="nav-item nav-link" to="/view-my">
          My Posts
        </Link>
      </div>
      <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
