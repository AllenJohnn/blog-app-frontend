import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="page-title">All Blog Posts</h2>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="alert alert-info text-center py-4">
              No posts found. Be the first to write something!
            </div>
          ) : (
            <div className="d-flex flex-column mb-5">
              {posts.map((val) => (
                <div className="blog-feed-item" key={val._id || val.id}>
                  <div className="blog-meta">
                    <span>Published</span>
                    <span>•</span>
                    <span>
                      {new Date(val.postedOn).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
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

export default ViewAll;
