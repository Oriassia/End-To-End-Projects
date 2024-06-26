import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MARKET_BASE_URL } from "../../../url.constant";
import { FaArrowLeft, FaEdit, FaHeart, FaShareSquare } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchProductDetails() {
    try {
      const { data } = await axios.get(`${MARKET_BASE_URL}/${id}`);
      console.log(data);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="productDetailsPage bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="productDetailsCard bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="text-gray-500 hover:text-gray-700 mb-4"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size="1.5em" />
        </button>
        {!product ? (
          <div>No product details found</div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-1">
              <strong>In Stock:</strong> {product.quantity}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Category:</strong> {product.category}
            </p>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                <FaEdit />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                <FaHeart />
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                <FaShareSquare />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
