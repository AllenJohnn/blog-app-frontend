import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function ViewAll() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const token = sessionStorage.getItem("token");
      const config = { headers: { token: token } };
      try {
        const response = await axios.post(
          "http://localhost:3030/api/view-all",
          {},
          config,
        );
        // Ensure data is array before storing it
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGlobalData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">All Blog Posts</h3>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            No posts found. Be the first to write something!
          </div>
        ) : (
          <div className="row">
            {posts.map((val) => (
              <div className="col-md-6 mb-3" key={val._id || val.id}>
                <div className="card h-100 shadow-sm border">
                  <div className="card-body">
                    <p className="card-text text-dark">{val.message}</p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0 text-muted small d-flex justify-content-between">
                    <span>
                      Posted on: {new Date(val.postedOn).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAll;
