import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    region: "",
    hobbies: "",
    favoriteCountry: [],
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch Users

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

  // Handle Input Change

  const handleChange = (e) => {
    const { name, type, value, multiple, options, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else if (multiple) {
      const selectedValues = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setForm({ ...form, [name]: selectedValues });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit Form

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "favoriteCountry") {
          form.favoriteCountry.forEach((fvrt) =>
            formData.append("favoriteCountry", fvrt)
          );
        } else {
          formData.append(key, form[key]);
        }
      });

      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        name: "",
        region: "",
        hobbies: "",
        favoriteCountry: [],
        image: null,
      });

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit User

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

  // Delete User

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name :{" "}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /> <br />
        <label>
          Region :{" "}
          <select name="region" value={form.region} onChange={handleChange}>
            <option value="India">India</option>
            <option value="Italy">Italy</option>
            <option value="Denmark">Denmark</option>
          </select>
        </label>
        <br /> <br />
        <label>
          Hobbies :{" "}
          <input
            type="text"
            name="hobbies"
            value={form.hobbies}
            onChange={handleChange}
          />
        </label>
        <br /> <br />
        {/* Multiple Select */}
        <label> Favorite Country : </label>
        <br />
        <select
          name="favoriteCountry"
          value={form.favoriteCountry}
          onChange={handleChange}
          multiple
          style={{ margin: 10 }}
        >
          <option value="Singapore">Singapore</option>
          <option value="Brazil">Brazil</option>
          <option value="Spain">Spain</option>
        </select>
        <br /> <br />
        {/* File Input */}
        <label> Profile Photo : </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <br /> <br />
        <button type="submit">{editingId ? "Update" : "Add"} User</button>
      </form>

      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.image && (
              <img
                src={`http://localhost:5000/${user.image}`}
                alt={user.name}
                width="100"
              />
            )}
            <br />
            {user.name} - {user.region} - {user.hobbies} -{" "}
            {user.favoriteCountry?.join(", ")} -
            <br />
            <button style={{ margin: 10 }} onClick={() => handleEdit(user)}>
              Edit
            </button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
