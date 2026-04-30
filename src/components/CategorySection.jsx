import ItemCard from "./ItemCard";

const CategorySection = ({ title, items, favorites, toggleFavorite }) => {
  return (
    <div className="mb-8">

      {/* 🏷 Category Title */}
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      {/* 📦 Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items?.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;