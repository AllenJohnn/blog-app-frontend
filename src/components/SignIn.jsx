import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Prevents duplicate form submissions

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
        setError(response.data.status);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Re-enables the form once the backend responds
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="mb-4 text-center">Login Portal</h2>

        {error && (
          <div className="alert alert-danger p-2 small text-center text-capitalize mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-control"
              name="email"
              value={input.email}
              onChange={inputHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-control"
              name="password"
              value={input.password}
              onChange={inputHandler}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center">
          <Link className="small text-decoration-none text-secondary" to="/signup">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
