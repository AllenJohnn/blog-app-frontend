import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if the user is currently logged in
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container-fluid px-3">
        <Link
          className="navbar-brand font-weight-bold"
          to={isLoggedIn ? "/view-all" : "/"}
        >
          BlogSystem
        </Link>

        {/* Only show navigation and logout buttons if a user is authenticated */}
        {isLoggedIn && (
          <>
            <div className="navbar-nav me-auto">
              <Link className="nav-link" to="/create">
                Add Post
              </Link>
              <Link className="nav-link" to="/view-all">
                All Posts
              </Link>
              <Link className="nav-link" to="/view-my">
                My Posts
              </Link>
            </div>

            <button
              className="btn btn-outline-danger btn-sm px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
