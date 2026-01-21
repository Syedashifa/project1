// Home.jsx
// Fetch posts from backend GET /api/posts, show loading/error, local create/delete kept simple.
// Updated: addPost now sends POST to backend for persistence.

import { useState, useEffect } from "react";
import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

function Home() {
  const [showModal, setShowModal] = useState(false);
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
        if (mounted) setPosts(Array.isArray(data) ? data : []);
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

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  // Updated: Send POST to backend, then add to local state
  const addPost = async (newPost) => {
    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
      });
      if (!response.ok) throw new Error("Failed to create post");
      const createdPost = await response.json();
      setPosts((prev) => [createdPost, ...prev]); // Add to local state
      setShowModal(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Check console for details.");
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to My Personal Blog Website</h1>
          <p>
            A space where I share lifestyle stories, food diaries,
            wishlists, and everyday inspirations.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => setShowModal(true)}>
              CREATE BLOG
            </button>
          </div>
        </div>
      </section>

      <main className="posts-section">
        {loading && <p className="loading">Loading posts…</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && <PostList posts={posts} onDelete={handleDelete} />}
      </main>

      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onCreate={addPost}
        />
      )}
    </>
  );
}

export default Home;