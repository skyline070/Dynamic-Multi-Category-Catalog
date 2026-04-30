import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow bg-white">

      {/* 🏠 Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-bold text-lg ${
            isActive ? "text-blue-600" : "text-gray-800"
          }`
        }
      >
        Catalog
      </NavLink>

      {/* ❤️ Favorites */}
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `text-lg ${
            isActive ? "text-blue-600 font-semibold" : "text-blue-500"
          }`
        }
      >
        Favorites ❤️
      </NavLink>

    </div>
  );
};

export default Navbar;