import { useParams, useNavigate } from "react-router-dom";


const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find((post) => post.id === Number(id));

  if (!blog) {
    return <h2 style={{ textAlign: "center" }}>Blog not found</h2>;
  }

  return (
    <div className="post-details-container">
      <h1>{blog.title}</h1>
      <p className="post-category">{blog.category}</p>

      <div className="post-content">
        {blog.content.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <button onClick={() => navigate("/")}>
        BACK TO HOME
      </button>
    </div>
  );
};

export default PostDetails;
