import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch Data

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}-{user.region}-{user.hobbies}-{user.favoriteCountry}-
            {user.image}
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
