import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function CreatePost() {
  const [message, setMessage] = useState("");

  const sendPost = async () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const payload = { userId, message };
    const config = {
      headers: { token: token, "Content-Type": "application/json" },
    };
    try {
      const response = await axios.post(
        "http://localhost:3030/api/create-post",
        payload,
        config,
      );
      if (response.data.status === "success") {
        alert("System log entry broadcast updated.");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h3 className="mb-3">Create New Entry</h3>
            <div className="card p-4 bg-light">
              <div className="mb-3">
                <label className="form-label">Post Description Context</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="btn btn-primary px-4" onClick={sendPost}>
                Save Log Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
