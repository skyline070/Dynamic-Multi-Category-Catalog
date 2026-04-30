/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";

const Favorites = () => {
  // ⭐ Favorites state (initialized safely from localStorage)
  const [favorites, setFavorites] = useState([]);

  // 📥 Load favorites once on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);
    } catch {
      // fallback in case JSON parsing fails
      setFavorites([]);
    }
  }, []);

  // 🔄 Sync state + localStorage together
  const syncFavorites = (updated) => {
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // ❤️ Toggle favorite item (add/remove)
  const toggleFavorite = (item) => {
    const exists = favorites.some((f) => f.id === item.id);

    const updated = exists
      ? favorites.filter((f) => f.id !== item.id)
      : [...favorites, item];

    syncFavorites(updated);
  };

  return (
    <div className="p-5">

      {/* 🏷 Page Title */}
      <h1 className="text-2xl font-bold mb-4">
        My Favorites ❤️
      </h1>

      {/* 🚫 Empty State UI */}
      {favorites.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">
            No favorites yet 😕
          </p>
          <p className="text-sm text-gray-400">
            Add items from Home page
          </p>
        </div>
      ) : (
        // 📦 Favorites Grid
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;