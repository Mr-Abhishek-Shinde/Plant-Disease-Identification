import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <div className="navbar">
      <div className="nav-title">
        <Link to="/">
          <h1 className="title">AgroNexus</h1>
          <h3>From Diagnosis To Solution</h3>
        </Link>
      </div>
      <nav>
        {user && (<div>
          <span>{user.email}</span>
          <li>
            <button onClick={handleClick} >Log Out</button>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/predict">Predict</Link>
          </li>
        </div>
        )}
        {!user && (
          <div>
            <li>
              <Link to="/authenticate">Login/SignUp</Link>
            </li>
          </div>
        )}
      </nav >
    </div >
  );
};

export default Navbar;
