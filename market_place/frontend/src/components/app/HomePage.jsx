import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MARKET_BASE_URL } from "../../../url.constant";

import ProductCard from "../homePage/ProductCard";
import FilterForm from "../homePage/FilterForm";
import PaginationBox from "../homePage/PaginationBox";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [searchParams]); // Fetch products whenever search params change

  async function fetchProducts() {
    try {
      setLoading(true);
      const params = {
        name: searchParams.get("name") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        page: searchParams.get("page") || 1,
        limit: searchParams.get("limit") || 6,
        inStock: searchParams.get("inStock") || true,
      };
      const { data } = await axios.get(MARKET_BASE_URL, { params });
      setProducts(data.products || []);
      setPagesCount(Math.ceil((data.productsCount || 0) / params.limit));
      setCurrentPage(params.page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error loading data");
      setLoading(false);
    }
  }

  function handleFilterChange(ev) {
    const inputName = ev.target.name;
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    searchParams.set(inputName, value);
    if (inputName !== "page") {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  }

  const handlePageChange = (direction) => {
    let newPage = currentPage;
    if (direction === "next" && currentPage < pagesCount) {
      newPage++;
    } else if (direction === "prev" && currentPage > 1) {
      newPage--;
    }
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-10 px-8">
      {/* filter form component >> */}
      <FilterForm
        searchParams={searchParams}
        handleFilterChange={handleFilterChange}
      />
      <PaginationBox pagesCount={pagesCount} currentPage={currentPage} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul className="flex flex-row flex-wrap gap-10 mx-10">
            {products.map((product) => (
              // product component >>
              <ProductCard product={product} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default HomePage;
