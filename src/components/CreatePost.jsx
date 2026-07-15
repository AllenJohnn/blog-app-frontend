import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function CreatePost() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ text: "", type: "" }); // Handles error/success alerts
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Don't submit empty posts

    setStatus({ text: "", type: "" });
    setLoading(true);

    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const payload = { userId, message };

    const config = {
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3030/api/create-post",
        payload,
        config,
      );

      if (response.data.status === "success") {
        setStatus({ text: "Post created successfully!", type: "success" });
        setMessage(""); // Clears the textarea after successful post
      } else {
        setStatus({ text: response.data.status, type: "danger" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ text: "Failed to publish post. Try again.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-3">Create New Post</h3>

            {status.text && (
              <div
                className={`alert alert-${status.type} p-2 small text-center text-capitalize`}
              >
                {status.text}
              </div>
            )}

            <div className="card p-4 bg-light shadow-sm">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">What's on your mind?</label>
                  <textarea
                    required
                    className="form-control"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your post content here..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading || !message.trim()}
                >
                  {loading ? "Publishing..." : "Publish Post"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
