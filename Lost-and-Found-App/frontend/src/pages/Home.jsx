
import React, { useState, useEffect } from "react";
import api from "../api";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [typeFilter, setTypeFilter] = useState(""); // "" = all
  const [statusFilter, setStatusFilter] = useState(""); // "" = all

  // Fetch all items from backend
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

    // Listen for login/logout across tabs
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Filter items based on selected type and status
  const filteredItems = items.filter((item) => {
    return (
      (typeFilter === "" || item.type === typeFilter) &&
      (statusFilter === "" || item.status === statusFilter)
    );
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>

      {/* Show form only if logged in */}
      {isLoggedIn ? (
        <ItemForm fetchItems={fetchItems} />
      ) : (
        <div className="mb-4 p-4 bg-yellow-100 rounded">
          <p>
            Please{" "}
            <Link to="/login" className="text-blue-500 underline">
              login
            </Link>{" "}
            to add items.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="returned">Returned</option>
        </select>
      </div>

      {/* Show filtered items */}
      <ItemList items={filteredItems} fetchItems={fetchItems} />
    </div>
  );
};

export default Home;
