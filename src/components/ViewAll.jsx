import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function ViewAll() {
  const [posts, setPosts] = useState([]);

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
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGlobalData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">Global Communication Log Stream</h3>
        <div className="row">
          {posts.map((val, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card h-100 shadow-sm border">
                <div className="card-body">
                  <p className="card-text text-dark">{val.message}</p>
                </div>
                <div className="card-footer bg-transparent border-top-0 text-muted small">
                  Published coordinate reference trace: {val.postedOn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAll;
