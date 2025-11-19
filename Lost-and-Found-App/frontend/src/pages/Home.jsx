import React, { useState, useEffect } from "react";
import api from "../api";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

const Home = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>
      <ItemForm fetchItems={fetchItems} />
      <ItemList items={items} />
    </div>
  );
};

export default Home;
