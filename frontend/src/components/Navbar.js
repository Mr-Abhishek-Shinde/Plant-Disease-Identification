import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = (props) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  // setTimeout(() => {
  //   props.setOnPrediction(true);
  // }, 1000);

  return (
    <div className="navbar">
      <div className="nav-title">
        <Link to="/">
          <h1 className="title">AgroNexus</h1>
          <h3>From Diagnosis To Solution</h3>
        </Link>
      </div>
      <nav>
        {user && (
          <div>
            <li>
              <span>
                <span className="Greeting">{"Welcome "} </span>
                <span className="UserId">{user.email}</span>
              </span>
            </li>
            {props.onPrediction && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            {!props.onPrediction && (
              <li>
                <Link to="/predict">Predict</Link>
              </li>
            )}
            <li>
              <button className="logout-button" onClick={handleClick}>
                Log Out
              </button>
            </li>
          </div>
        )}
        {!user && (
          <div>
            {props.onLogin && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            {!props.onLogin && (
              <li>
                <Link to="/authenticate">Login/SignUp</Link>
              </li>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
