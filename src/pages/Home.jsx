/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CategorySection from "../components/CategorySection";
import SkeletonCard from "../components/SkeletonCard";

// 📦 Local JSON data
import rawData from "../data/data.json";

const Home = () => {
  // 🔹 Main data state
  const [data, setData] = useState([]);

  // 🔹 UI states
  const [loading] = useState(false); // ❌ no need for loading (local JSON)
  const [error, setError] = useState("");

  // 🔹 Search state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🔹 Category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔹 Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // 🔹 Mode toggle
  const [mode, setMode] = useState("pagination");
  const [visibleCount, setVisibleCount] = useState(6);

  // ⭐ Favorites (localStorage safe init)
  const [favorites, setFavorites] = useState([]);

  // 📥 Load local JSON data
  useEffect(() => {
    try {
      // 🔥 transform data properly
      const formatted = rawData.map((item, index) => ({
        id: String(index),

        itemname: item.itemname,
        category: item.category,
        image: item.image,

        // 📌 dynamic properties
        itemprops: item.itemprops,
      }));

      setData(formatted);
      setError("");
    } catch {
      setError("Failed to load data");
    }
  }, []);

  // ❤️ Load favorites once on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // ⏳ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // 📊 Categories
  const categories = [
    "All",
    ...new Set((data || []).map((i) => i.category)),
  ];

  // 🔍 Filter logic
  const filteredData = (data || []).filter((item) => {
    const matchesSearch = item.itemname
      ?.toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 🔄 Infinite scroll
  useEffect(() => {
    if (mode !== "infinite") return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        visibleCount < filteredData.length
      ) {
        setVisibleCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode, visibleCount, filteredData.length]);

  // 📄 Pagination
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const visibleData = filteredData.slice(0, visibleCount);

  const finalData =
    mode === "pagination" ? paginatedData : visibleData;

  // 🧩 Group by category
  const groupedData = finalData.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // ❤️ toggle favorites
  const toggleFavorite = (item) => {
    let updated;

    if (favorites.find((f) => f.id === item.id)) {
      updated = favorites.filter((f) => f.id !== item.id);
    } else {
      updated = [...favorites, item];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // ❌ error UI
  if (error) {
    return (
      <div className="p-5 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* 🔍 Search */}
      <input
        className="w-full p-3 border rounded mb-5"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
          setVisibleCount(6);
        }}
      />

      {/* 🔘 Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("pagination")}
          className={`px-3 py-1 rounded ${
            mode === "pagination"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pagination
        </button>

        <button
          onClick={() => setMode("infinite")}
          className={`px-3 py-1 rounded ${
            mode === "infinite"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Infinite
        </button>
      </div>

      {/* 🧩 Categories */}
      <div className="flex gap-2 flex-wrap mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
              setVisibleCount(6);
            }}
            className={`px-3 py-1 rounded ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 💀 loading (not used but kept for structure) */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(8)
            .fill()
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : Object.keys(groupedData).length === 0 ? (
        <p className="text-center text-gray-500">
          No items found 😕
        </p>
      ) : (
        Object.keys(groupedData).map((category) => (
          <CategorySection
            key={category}
            title={category}
            items={groupedData[category]}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))
      )}

      {/* 📄 pagination */}
      {mode === "pagination" && (
        <div className="flex justify-center mt-5 gap-2">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage((p) => Math.max(p - 1, 1))
            }
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span>{page}</span>

          <button
            disabled={
              page * itemsPerPage >= filteredData.length
            }
            onClick={() =>
              setPage((p) =>
                p * itemsPerPage < filteredData.length
                  ? p + 1
                  : p
              )
            }
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;