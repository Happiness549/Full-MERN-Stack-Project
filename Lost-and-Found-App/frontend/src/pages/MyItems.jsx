
import React, { useState, useEffect } from "react";
import api from "../api";
import ItemList from "../components/ItemList";

const MyItems = () => {
  const [items, setItems] = useState([]);

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      const res = await api.get("/items/my", {
        headers: {
          Authorization: `Bearer ${token}`, // send token
        },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Items</h1>
      <ItemList items={items} fetchItems={fetchMyItems} />
    </div>
  );
};

export default MyItems;
