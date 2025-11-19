import React from "react";

const ItemList = ({ items }) => {
  if (!items.length) return <p>No items yet.</p>;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold">{item.title}</h2>
          <p>{item.description}</p>
          <p>
            <strong>Type:</strong> {item.type} | <strong>Location:</strong>{" "}
            {item.location}
          </p>
          <p>
            <strong>Contact:</strong> {item.contact}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
