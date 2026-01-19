import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>MY BLOG</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/lifestyle">Lifestyle</Link>
        <Link to="/food">Food</Link>
        <Link to="/wishlists">Wishlists</Link>
      </div>
    </nav>
  );
}

export default Navbar;
