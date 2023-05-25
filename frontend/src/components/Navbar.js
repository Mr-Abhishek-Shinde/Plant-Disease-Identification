import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-title">
        <Link to="/">
          <h1 className="title">AgroNexus</h1>
          <h3>From Diagnosis To Solution</h3>
        </Link>
      </div>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/predict">Predict</Link>
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
