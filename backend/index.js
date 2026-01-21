// index.js
// Enable CORS and start server even if Mongo connection fails (development-friendly).
// Updated: Use MongoDB for posts via Post model.
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoutes.js";
import Post from "./models/Post.js"; // Import the Post model

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // allow cross-origin requests from frontend (http://localhost:3000)

// Your existing user routes
app.use("/api/user", route);

// GET /api/posts: Fetch posts from MongoDB
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by newest first
    // Map _id to id for frontend compatibility
    const formattedPosts = posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      category: post.category
    }));
    res.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST /api/posts: Create a new post in MongoDB
app.post("/api/posts", async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const newPost = new Post({ title, content, category: category || "general" });
    await newPost.save();
    // Return formatted post
    res.status(201).json({
      id: newPost._id.toString(),
      title: newPost.title,
      content: newPost.content,
      category: newPost.category
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Seed initial data if DB is connected and collection is empty
async function seedData() {
  try {
    const count = await Post.countDocuments();
    if (count === 0) {
      const initialPosts = [
        {
          title: "Finding Beauty in Simple Days",
          content: "In the hustle of modern life, it's easy to overlook the small moments that bring joy. Today, I took a walk in the park and noticed the way the sunlight filtered through the leaves. It reminded me that beauty is everywhere if we pause to look. Simple routines like morning coffee or a quiet evening can ground us. What are your favorite simple pleasures?",
          category: "lifestyle"
        },
        {
          title: "Morning Routines That Calm the Mind",
          content: "Starting the day with intention can set a positive tone. My routine includes 10 minutes of meditation, followed by journaling my gratitude. I find that this helps reduce anxiety and increases focus. Try incorporating breathing exercises or a short walk. How do you start your mornings?",
          category: "lifestyle"
        },
        {
          title: "My Favorite Comfort Foods",
          content: "Comfort food is more than just eating; it's about nostalgia and warmth. My top picks include homemade mac and cheese, a hearty soup, and chocolate chip cookies. These dishes remind me of childhood. What's your go-to comfort meal?",
          category: "food"
        },
        {
          title: "Easy Homemade Recipes I Love",
          content: "Cooking at home doesn't have to be complicated. One of my favorites is a quick stir-fry with vegetables and tofu. Another is a simple pasta salad with fresh herbs. These recipes are healthy, delicious, and take under 30 minutes. Share your easy recipe ideas!",
          category: "food"
        },
        {
          title: "Things I Want to Do This Year",
          content: "New Year resolutions can be exciting. On my wishlist: travel to a new country, learn a musical instrument, and read 12 books. I also want to volunteer more in my community. What are your goals for the year?",
          category: "wishlist"
        },
        {
          title: "Books and Places on My Wishlist",
          content: "Reading expands the mind, and travel broadens the horizons. Books I'm eager to read: 'The Midnight Library' and 'Educated'. Places to visit: Japan and Iceland. These experiences will enrich my life. What's on your wishlist?",
          category: "wishlist"
        }
      ];
      await Post.insertMany(initialPosts);
      console.log("Seeded initial posts");
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Try to connect to Mongo, but start server regardless so frontend can fetch during dev
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

if (MONGOURL) {
  mongoose
    .connect(MONGOURL)
    .then(async () => {
      console.log("Database connected successfully.");
      await seedData(); // Seed data after connection
      startServer();
    })
    .catch((error) => {
      console.error("Database connection failed:", error.message || error);
      console.warn("Starting server without DB connection (dev fallback).");
      startServer();
    });
} else {
  console.warn("MONGO_URL not set — starting server without DB connection (dev fallback).");
  startServer();
}