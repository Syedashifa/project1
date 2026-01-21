// PostList.jsx
// Displays a grid of posts with excerpt, category badge, Read More link to /post/:id

import { Link } from "react-router-dom";

function PostList({ posts = [], onDelete }) {
  if (!posts || posts.length === 0) {
    return <p className="no-posts">No posts available.</p>;
  }

  return (
    <section className="posts-grid">
      {posts.map((post) => {
        const excerpt = post.content
          ? post.content.length > 120
            ? post.content.slice(0, 120) + "…"
            : post.content
          : "No preview available.";

        return (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <h3>{post.title}</h3>
              {post.category && <span className="post-badge">{post.category}</span>}
            </div>

            <p className="post-excerpt">{excerpt}</p>

            <div className="post-actions">
              <Link to={`/post/${post.id}`} className="primary-btn">
                READ MORE
              </Link>

              {onDelete && (
                <button
                  className="secondary-btn"
                  onClick={() => onDelete(post.id)}
                >
                  DELETE
                </button>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default PostList;