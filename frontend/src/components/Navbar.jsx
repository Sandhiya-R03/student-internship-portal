import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">InternHub</Link>
      <nav>
        <Link to="/internships">Internships</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="link-button" onClick={signOut}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="nav-cta" to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
