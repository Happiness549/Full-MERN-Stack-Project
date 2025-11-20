import React from "react";
import api from "../api";

const ItemList = ({ items, fetchItems }) => {
  const token = localStorage.getItem("token");

  // Mark item as returned
  const handleReturn = async (id) => {
    try {
      await api.put(`/items/${id}/return`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchItems(); // refresh list
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="space-y-4">
      {items.length === 0 && <p>No items found.</p>}
      {items.map((item) => (
        <div key={item._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p>{item.description}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Contact:</strong> {item.contact}</p>
          <p><strong>Posted by:</strong> {item.user?.name || "Unknown"}</p>

          {/* Show Mark as Returned button only if logged in and status is open */}
          {token && item.status === "open" && (
            <button
              onClick={() => handleReturn(item._id)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Mark as Returned
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
