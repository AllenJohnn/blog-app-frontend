import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function ViewMyPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyData = async () => {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");
      const config = { headers: { token: token } };
      const bodyPayload = { userId };
      try {
        const response = await axios.post(
          "http://localhost:3030/api/view-my-posts",
          bodyPayload,
          config,
        );
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMyData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">Isolated Identification Tracker Logs</h3>
        <div className="row">
          {posts.map((val, index) => (
            <div className="col-12 mb-2" key={index}>
              <div className="card border-start border-primary border-4 shadow-sm">
                <div className="card-body">
                  <p className="mb-1 text-dark font-monospace">{val.message}</p>
                  <div className="text-muted small">
                    Timeline trace signature: {val.postedOn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewMyPost;
