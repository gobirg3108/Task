import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    sex: "",
    language: [],
    phone: "",
    address: "",
    intro: "",
    image: null, // file upload
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
        if (key === "language") {
          form.language.forEach((lang) => formData.append("language", lang));
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
        age: "",
        email: "",
        sex: "",
        language: [],
        phone: "",
        address: "",
        intro: "",
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
      email: user.email,
      age: user.age,
      sex: user.sex,
      language: user.language || [],
      phone: user.phone,
      address: user.address,
      intro: user.intro,
      image: null, // reset, new file optional
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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <br />

        {/* Radio */}
        <label>
          <input type="radio" name="sex" value="Male" onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="sex" value="Female" onChange={handleChange} />
          Female
        </label>
        <label>
          <input type="radio" name="sex" value="Other" onChange={handleChange} />
          Other
        </label>
        <br />

        {/* Multiple Select */}
        <select name="language" value={form.language} onChange={handleChange} multiple>
          <option value="Tamil">Tamil</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
        <br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <br />

        {/* Textarea */}
        <textarea
          type="text"
          name="intro"
          placeholder="Describe yourself"
          value={form.intro}
          onChange={handleChange}
        />
        <br />

        {/* File Input */}
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <br />

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
            {user.name} - {user.email} - {user.age} - {user.sex} -{" "}
            {user.language?.join(", ")} - {user.phone} - {user.address} -{" "}
            {user.intro}
            <br />
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
