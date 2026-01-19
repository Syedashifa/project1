import PostList from "../components/PostList";

const foodPosts = [
  { id: 3, title: "My favorite comfort foods" },
  { id: 4, title: "Easy homemade recipes I love" },
];

function Food() {
  return (
    
      <PostList posts={foodPosts} />
    
  );
}

export default Food;
