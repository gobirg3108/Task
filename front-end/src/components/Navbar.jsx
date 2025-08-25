import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/add">Add User</Link>
        <Link to="/list">User List</Link>
      </nav>
    </div>
  );
}

export default Navbar;
