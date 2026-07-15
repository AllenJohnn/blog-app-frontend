import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if the user is currently logged in
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white mb-4 py-3">
      <div className="container px-3">
        <Link
          className="navbar-brand fw-bold text-dark fs-4"
          to={isLoggedIn ? "/view-all" : "/"}
        >
          BlogSystem
        </Link>

        {/* Only show navigation and logout buttons if a user is authenticated */}
        {isLoggedIn && (
          <>
            <div className="navbar-nav me-auto ms-4">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 fw-medium ${isActive ? "text-dark active" : "text-secondary"}`
                }
                to="/create"
              >
                Add Post
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 fw-medium ${isActive ? "text-dark active" : "text-secondary"}`
                }
                to="/view-all"
              >
                All Posts
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 fw-medium ${isActive ? "text-dark active" : "text-secondary"}`
                }
                to="/view-my"
              >
                My Posts
              </NavLink>
            </div>

            <button
              className="btn btn-outline-danger btn-sm px-3 rounded-pill"
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
