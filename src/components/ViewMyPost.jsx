import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function ViewMyPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">My Posts</h3>

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="alert alert-info text-center py-4">
            You haven't created any posts yet. Click "Add Post" to get started!
          </div>
        ) : (
          <div className="row">
            {posts.map((val) => (
              <div className="col-12 mb-3" key={val._id || val.id}>
                {/* Kept your nice custom left border accent from the original layout! */}
                <div className="card border-start border-primary border-4 shadow-sm">
                  <div className="card-body">
                    <p className="mb-2 text-dark">{val.message}</p>
                    <div className="text-muted small">
                      Posted on: {new Date(val.postedOn).toLocaleString()}
                    </div>
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

export default ViewMyPost;
