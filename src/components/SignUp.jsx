import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const readValues = async () => {
    if (input.password !== input.confirmPassword) {
      alert("Error: Passwords structural discrepancy detected.");
      return;
    }
    const payload = {
      name: input.name,
      phone: input.phone,
      email: input.email,
      password: input.password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3030/api/signup",
        payload,
      );
      if (response.data.status === "success") {
        alert("Success: Account successfully allocated.");
        navigate("/");
      } else {
        alert("Failure state: " + response.data.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4 bg-light shadow-sm">
          <h2 className="mb-4 text-center">Registration</h2>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              name="phone"
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              onChange={inputHandler}
            />
          </div>
          <button className="btn btn-success w-100" onClick={readValues}>
            Register Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
