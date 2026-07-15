import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const readValues = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/api/signin",
        input,
      );
      if (response.data.status === "success") {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);
        navigate("/create");
      } else {
        alert("Authentication failure: " + response.data.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 border rounded p-4 bg-light shadow-sm">
          <h2 className="mb-4 text-center">Login Portal</h2>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              className="form-control"
              name="email"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={inputHandler}
            />
          </div>
          <button className="btn btn-primary w-100 mb-3" onClick={readValues}>
            Sign In
          </button>
          <div className="text-center">
            <Link className="small text-decoration-none" to="/signup">
              New identity creation tracker setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
