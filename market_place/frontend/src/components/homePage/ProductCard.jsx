import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductCard(props) {
  const { product } = props;
  return (
    <>
      <li
        key={product._id}
        className="flex flex-col justify-between w-[190px] h-[254px] p-3 bg-gray-100 relative overflow-visible shadow-md cursor-pointer"
        onClick={() => navigate(`/${product._id}`)}
      >
        <div className="bg-[#ffcaa6] h-[35%] w-full rounded-md"></div>
        <div className="pt-[10%]">
          <p className="font-extrabold text-lg leading-6">{product.name}</p>
          <div className="text-sm pb-2.5">
            <p>Quantity: {product.quantity}</p>
            <p>Category: {product.category}</p>
          </div>
          <div className="flex justify-between items-center w-full pt-2 border-t border-gray-300">
            <span className="font-extrabold text-lg">${product.price}</span>
            <AddShoppingCartIcon
              fontSize="medium"
              className="cursor-pointer transition duration-300 ease-in hover:ease-out"
            />
          </div>
        </div>
      </li>
    </>
  );
}

export default ProductCard;
