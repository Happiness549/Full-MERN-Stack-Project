import React, { useState } from "react";
import api from "../api";

const ItemForm = ({ fetchItems }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lost",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/items", formData);
      setFormData({
        title: "",
        description: "",
        type: "lost",
        location: "",
        contact: "",
      });
      fetchItems(); // refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      ></textarea>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
