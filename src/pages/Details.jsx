/* eslint-disable react-hooks/set-state-in-effect */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// 📦 Import local data (SAME SOURCE AS HOME)
import rawData from "../data/data.json";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Favorites fallback support
  const getFavorites = () => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);

    try {
      // 🔍 Find item from SAME dataset used in Home
      const formatted = rawData.map((item, index) => ({
        id: String(index),
        ...item,
      }));

      const found = formatted.find((i) => i.id === id);

      // 🔁 fallback: check favorites
      if (!found) {
        const favs = getFavorites();
        const favItem = favs.find((i) => i.id === id);
        setItem(favItem || null);
      } else {
        setItem(found);
      }
    } catch {
      setItem(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // ⏳ Loading UI
  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  // ❌ Not found UI
  if (!item) {
    return (
      <div className="p-5 text-center">
        <p className="text-gray-500 text-lg">Item not found 😕</p>
        <button
          onClick={() => navigate("/")}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-5">

      {/* 🔙 Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* 🏷 Title */}
      <h1 className="text-3xl font-bold mb-2">
        {item.itemname}
      </h1>

      <p className="text-gray-500 mb-4">
        {item.category}
      </p>

      {/* 🖼 Image */}
      <img
        src={item.image}
        alt={item.itemname}
        className="w-full h-72 object-cover rounded-lg mb-5"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/400x300";
        }}
      />

      {/* 📦 Dynamic Properties */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-3">
          Specifications
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {item.itemprops?.map((prop, i) => (
            <div key={i} className="border p-2 rounded">
              {/* ✅ FIXED: label/value instead of key/value */}
              <strong>{prop.label}</strong>
              <p>{prop.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;