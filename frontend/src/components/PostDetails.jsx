// PostDetails.jsx
// Fetches all posts from backend and finds the post by id (simple beginner-friendly approach).
// Shows loading/error states.

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch("http://localhost:8000/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        const list = Array.isArray(data) ? data : [];
        const found = list.find((p) => String(p.id) === String(id));
        if (!found) {
          setError("Blog not found");
        } else {
          setBlog(found);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message || "Unknown error");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p className="loading">Loading post…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!blog) return <h2 style={{ textAlign: "center" }}>Blog not found</h2>;

  return (
    <div className="post-details-container">
      <h1>{blog.title}</h1>
      {blog.category && <p className="post-category">{blog.category}</p>}

      <div className="post-content">
        {String(blog.content || "")
          .split("\n")
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
      </div>

      <div className="post-actions">
        <button className="primary-btn" onClick={() => navigate("/")}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default PostDetails;