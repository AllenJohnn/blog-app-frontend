import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function Layout() {
  const isLoggedIn = !!sessionStorage.getItem("token");

  // Auth Guard: If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
