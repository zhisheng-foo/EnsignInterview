import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-100 rounded-xl p-6 shadow-lg w-80 text-center">
        <div className="flex items-center justify-center">
          <FaSignOutAlt className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer" />
        </div>
        <h2 className="text-lg font-black mb-4 font-nunito text-gray-800">Are you sure you want to log out?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition rounded-full font-nunito"
          >
            Logout
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition rounded-full font-nunito"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
