import { useState } from "react";
import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const [posts, setPosts] = useState([
    { id: 1, title: "Finding beauty in simple days" },
    { id: 2, title: "Morning routines that calm the mind" },
    { id: 3, title: "My favorite comfort foods" },
    { id: 4, title: "Easy homemade recipes I love", category: "food" },
    { id: 5, title: "Things I want to do this year", category: "wishlist" },
  
  ]);
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const addPost = (newPost) => {
    setPosts((prev) => [
      { id: Date.now(), ...newPost },
      ...prev
    ]);
  };
  return (
    <>
  <section className="hero">
    <h1>Welcome to My Personal Blog Website</h1>
    <p>
      A space where I share lifestyle stories, food diaries,
      wishlists, and everyday inspirations.
    </p>

    <button className="primary-btn" onClick={() => setShowModal(true)}>
      CREATE BLOG
    </button>
  </section>

  <PostList posts={posts} onDelete={handleDelete}/>

  {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onCreate={(newPost) =>
              setPosts((prevPosts) => [
              { ...newPost, id: prevPosts.length + 1 },
                ...prevPosts
  ])
}

    />
        )}
    </>
  );
}

const hero = {
  maxWidth: "1100px",
  margin: "100px auto 60px",
  padding: "0 20px",
};

export default Home;
