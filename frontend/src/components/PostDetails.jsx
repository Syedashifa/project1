import { useParams, Link } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();

  return (
    <section className="post-container">
      <h1>Blog Post {id}</h1>

      <p className="post-text">
        This is where your full blog content will appear.
        Clean typography for a calm reading experience.
      </p>

      {/* BUTTON AREA */}
      <div className="post-actions">
        <Link to="/" className="primary-btn">
          BACK TO HOME
        </Link>
      </div>
    </section>
  );
}

export default PostDetails;
