import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    region: "",
    hobbies: "",
    favoriteCountry: [],
    image: "null",
  });



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
        region: "",
        hobbies: "",
        favoriteCountry: [],
        image: "null",
      });

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <form>
        <label>
          Name :{" "}
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <br /> <br />
        <label>
          Region :{" "}
          <select name="region" value={form.region} onChange={handleChange}>
            <option value="India">India</option>
            <option value="Singapore">Singapore</option>
            <option value="France">France</option>
          </select>
        </label>
        <br /> <br />
        <label>
          Hobbies : <input type="text" name="region" />
        </label>
        <br /> <br />
        <label>
          Favorite Country : <br />
          <select name="favoriteCountry" multiple>
            <option value="Spain">Spain</option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
          </select>
        </label>
        <br /> <br />
        <label>Profile Photo : </label> <input type="file" value={form.image} />
      </form>
    </div>
  );
}

export default AddUser;
