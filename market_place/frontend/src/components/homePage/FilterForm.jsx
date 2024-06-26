import React from "react";

function FilterForm(props) {
  const { searchParams, handleFilterChange } = props;
  return (
    <>
      <form className="space-y-4 p-6 bg-white shadow-2xl rounded-lg">
        <div>
          <label
            htmlFor="nameInput"
            className="block text-sm font-medium text-gray-700"
          >
            Product name
          </label>
          <input
            id="nameInput"
            type="text"
            name="name"
            value={searchParams.get("name") || ""}
            placeholder="Enter product name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min price
          </label>
          <input
            id="minPrice"
            type="number"
            name="minPrice"
            value={searchParams.get("minPrice") || ""}
            placeholder="Enter min price"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleFilterChange}
          />
        </div>

        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max price
          </label>
          <input
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={searchParams.get("maxPrice") || ""}
            placeholder="Enter max price"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleFilterChange}
          />
        </div>

        <div className="flex items-center">
          <input
            id="inStockfilter"
            type="checkbox"
            name="inStock"
            checked={searchParams.get("inStock") === "true" || false}
            onChange={handleFilterChange}
            className="mr-2"
          />
          <label
            htmlFor="inStockfilter"
            className="text-sm font-medium text-gray-700"
          >
            In stock
          </label>
        </div>
      </form>
    </>
  );
}

export default FilterForm;
