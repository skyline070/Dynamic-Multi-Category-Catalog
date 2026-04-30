import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📥 Safe localStorage fallback
  const getFavorites = () => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);

        // 🔹 OPTION 1: Fetch full dataset (recommended)
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=50"
        );

        const data = await res.json();

        // 🔎 Find item by id
        let found = data.find((i) => String(i.id) === id);

        // 🔁 fallback to favorites
        if (!found) {
          const favs = getFavorites();
          found = favs.find((i) => i.id === id);
        }

        // 🔄 Transform into your UI format
        if (found) {
          found = {
            id: String(found.id),
            itemname: found.title,
            category: "Demo Category",
            image: found.thumbnailUrl || found.url,
            itemprops: [
              { key: "Album ID", value: found.albumId },
              { key: "Type", value: "Demo Data" },
            ],
          };
        }

        setItem(found);
      } catch (err) {
        console.error(err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // ⏳ Loading UI
  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  // ❌ Not found UI
  if (!item) {
    return (
      <div className="p-5 text-center">
        <p className="text-gray-500 text-lg">
          Item not found 😕
        </p>
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

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded"
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
          e.target.src =
            "https://via.placeholder.com/400x300";
        }}
      />

      {/* 📦 Dynamic Specs */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="font-semibold mb-3">
          Specifications
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {item.itemprops?.map((prop, i) => (
            <div key={i} className="border p-2 rounded">
              <strong>{prop.key}</strong>
              <p>{prop.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;