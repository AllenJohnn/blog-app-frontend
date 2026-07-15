import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [message, setMessage] = useState({ text: "", type: "" }); // Handles success/error banners
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // Validate passwords match before hitting the API
    if (input.password !== input.confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "danger" });
      return;
    }

    const payload = {
      name: input.name,
      phone: input.phone,
      email: input.email,
      password: input.password,
    };

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3030/api/signup", payload);
      
      if (response.data.status === "success") {
        setMessage({ text: "Account created successfully! Redirecting...", type: "success" });
        setTimeout(() => {
          navigate("/");
        }, 1500); // Gives the user a second to read the success message
      } else {
        setMessage({ text: response.data.status, type: "danger" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Something went wrong. Please try again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 bg-light shadow-sm">
          <h2 className="mb-4 text-center">Registration</h2>
          
          {/* Dynamic alert banner for errors or success */}
          {message.text && (
            <div className={`alert alert-${message.type} p-2 small text-center text-capitalize`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                required
                className="form-control"
                name="name"
                value={input.name}
                onChange={inputHandler}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                required
                className="form-control"
                name="phone"
                value={input.phone}
                onChange={inputHandler}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                required
                className="form-control"
                name="email"
                value={input.email}
                onChange={inputHandler}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                className="form-control"
                name="password"
                value={input.password}
                onChange={inputHandler}
                placeholder="Create a password"
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                required
                className="form-control"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={inputHandler}
                placeholder="Repeat password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-success w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Profile"}
            </button>
          </form>

          <div className="text-center">
            <Link className="small text-decoration-none" to="/">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;