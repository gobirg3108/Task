import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

function UserList() {
  const [users, setUsers] = useState([]);

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

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      region: user.region,
      hobbies: user.hobbies,
      favoriteCountry: user.favoriteCountry || [],
      image: null,
    });
    setEditingId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name}-{user.region}-{user.hobbies}-{user.favoriteCountry}-
            {user.image} 
            <br />
            <button style={{margin:10}} onClick={()=>{handleEdit}}>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
