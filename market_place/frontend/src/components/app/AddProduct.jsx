import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { MARKET_BASE_URL } from "../../../url.constant";

function AddProduct() {
  async function handleSubmitClick(ev) {
    ev.preventDefault(); // Prevent the default form submission

    const formData = new FormData(ev.target);
    const newProductData = {
      name: formData.get("name"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      category: formData.get("category"),
    };

    try {
      axios.post(MARKET_BASE_URL, newProductData);
    } catch (err) {
      console.error(err);
    }
    console.log(newProductData);
  }
  return (
    <>
      {
        <div className="flex flex-col gap-10 px-8">
          <form
            onSubmit={handleSubmitClick}
            className="space-y-4 p-6 bg-white shadow-2xl rounded-lg"
          >
            <div>
              <label
                htmlFor="searchInput"
                className="text-md font-medium text-gray-700"
              >
                New product details :
              </label>
            </div>
            <div>
              <label
                htmlFor="nameInput"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="nameInput"
                type="text"
                name="name"
                placeholder="input"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameInput"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="nameInput"
                type="number"
                name="price"
                placeholder="input"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameInput"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                id="nameInput"
                type="number"
                name="quantity"
                placeholder="input"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameInput"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="nameInput"
                type="text"
                name="category"
                placeholder="input"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <Button type="submit" variant="contained">
              Add product
            </Button>
          </form>
        </div>
      }
    </>
  );
}

export default AddProduct;
