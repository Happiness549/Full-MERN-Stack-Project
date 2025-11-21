
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
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(false); 

  
  const fetchItems = async () => {
    try {
      setLoading(true); 
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchItems();

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  
  const filteredItems = items.filter((item) => {
    const matchesType = typeFilter === "" || item.type === typeFilter;
    const matchesStatus = statusFilter === "" || item.status === statusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()); 

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-500">
      <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>

    
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

      
      <input
        type="text"
        placeholder="Search by item name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      
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

      
      {loading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

    
      {!loading && (
        <ItemList items={filteredItems} fetchItems={fetchItems} />
      )}
    </div>
  );
};

export default Home;
