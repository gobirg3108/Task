import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    region: "",
    hobbies: "",
    favoriteCountry: [],
    image: "",
  });

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
          />
        </label>
        <br /> <br />
        <label>
          Region :{" "}
          <select name="region" value={form.region}>
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
          Favorite Country : <select name="favoriteCountry" >
            <option value=""></option>
          </select>
        </label>
      </form>
    </div>
  );
}

export default AddUser;
