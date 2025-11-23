import React, { useState, useEffect } from "react";
import api from "../api";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

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
    <div className="max-w-3xl mx-auto p-4 bg-gray-500">
      <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>
      {isLoggedIn ? (
        <ItemForm fetchItems={fetchItems} />
      ) : (
        <div className="mb-4 p-4 bg-yellow-100 rounded">
          <p>
            Please <Link to="/login" className="text-blue-500 underline">login</Link> to add items.
          </p>
        </div>
      )}
      {isLoggedIn && <ItemList items={items} fetchItems={fetchItems} />}
    </div>
  );
};

export default Home;
