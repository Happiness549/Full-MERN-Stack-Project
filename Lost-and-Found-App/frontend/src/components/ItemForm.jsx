import React, { useState } from "react";
import api from "../api";

const ItemForm = ({ fetchItems }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("lost");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/items", { title, description, type, location, contact });
      setTitle("");
      setDescription("");
      setLocation("");
      setContact("");
      setType("lost");
      fetchItems(); // refresh list
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
      alert("Failed to add item. Make sure you are logged in.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
