import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, favorites = [], toggleFavorite }) => {
  const navigate = useNavigate();

  // ⭐ Safe favorite check
  const isFav = favorites?.some((f) => f.id === item.id);

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-3 cursor-pointer">

      {/* ❤️ Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item);
        }}
        className="absolute top-2 right-2 text-xl"
      >
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* 📦 Card Click */}
      <div
        onClick={() => navigate(`/item/${item.id}`)}
      >

        {/* 🖼 Image */}
        <img
          src={
            item.image ||
            "https://via.placeholder.com/300x200"
          }
          alt={item.itemname}
          className="w-full h-40 object-cover rounded-md"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />

        {/* 🏷 Title */}
        <h3 className="mt-3 font-semibold text-gray-800 line-clamp-2">
          {item.itemname}
        </h3>

        {/* 📂 Category */}
        <p className="text-sm text-gray-500">
          {item.category}
        </p>

      </div>
    </div>
  );
};

export default ItemCard;