import { Link } from "react-router-dom";

function PostList({ posts, onDelete }) {
  return (
    <section className="post-grid">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>

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
        </div>
      ))}
    </section>
  );
}

export default PostList;
