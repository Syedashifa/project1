import PostList from "../components/PostList";

const lifestylePosts = [
  { id: 1, title: "Finding beauty in simple days" },
  { id: 2, title: "Morning routines that calm the mind" },
];

function Lifestyle() {
  return (
    
      <PostList posts={lifestylePosts} />
    
  );
}

export default Lifestyle;
