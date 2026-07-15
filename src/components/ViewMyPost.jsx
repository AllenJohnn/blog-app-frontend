import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="page-title">My Posts</h2>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="alert alert-info text-center py-4">
              You haven't created any posts yet. Click "Add Post" to get started!
            </div>
          ) : (
            <div className="d-flex flex-column mb-5">
              {posts.map((val) => (
                <div
                  className="blog-feed-item ps-3 accent-post-card"
                  key={val._id || val.id}
                >
                  <div className="blog-meta">
                    <span>Published by You</span>
                    <span>•</span>
                    <span>
                      {new Date(val.postedOn).toLocaleString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="blog-content">{val.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMyPost;
