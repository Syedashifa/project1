import PostList from "../components/PostList";

const wishlistPosts = [
  { id: 5, title: "Things I want to do this year" },
  { id: 6, title: "Books and places on my wishlist" },
];

function Wishlists() {
  return (
    
      <PostList posts={wishlistPosts} />
    
  );
}

export default Wishlists;
