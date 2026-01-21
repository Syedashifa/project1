// Food.jsx
// Fetch posts and filter by category "food".

import { useEffect, useState } from "react";
import PostList from "../components/PostList";

function Food() {
  const [posts, setPosts] = useState([]);
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
        setPosts(list.filter((p) => String(p.category).toLowerCase() === "food"));
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
  }, []);

  return (
    <>
      {loading && <p className="loading">Loading food posts…</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && <PostList posts={posts} />}
    </>
  );
}

export default Food;