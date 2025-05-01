import React from 'react';

const ViewAllProducts = () => {
  return (
    <section className="min-h-screen bg-gray-100 p-6 font-nunito">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <h2 className="text-lg font-semibold mb-2">Product {index + 1}</h2>
              <p className="text-sm text-gray-600">Product description goes here.</p>
              <button className="mt-3 btn btn-sm btn-primary">View</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewAllProducts;
