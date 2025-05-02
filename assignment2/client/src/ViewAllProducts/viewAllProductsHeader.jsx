import React from 'react';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ categories, searchQuery, setSearchQuery, onLogoutClick }) => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center text-2xl font-semibold text-gray-900 mr-6">
        <img className="w-11 h-11 mb-2" src="/logo (2).png" alt="logo" />
        <span className="font-bold ml-2">Shoplify</span>
      </div>

      <div className="flex-1 mx-4">
        <select
          className="w-full px-4 py-2 border rounded-xl border-gray-300 text-gray-700 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <FaShoppingCart className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer mr-5" />
      <FaSignOutAlt
        className="text-xl text-gray-600 hover:text-black cursor-pointer"
        onClick={onLogoutClick}
      />
    </header>
  );
};

export default Header;