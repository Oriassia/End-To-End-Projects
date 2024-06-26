import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function PaginationBox(props) {
  const { currentPage, pagesCount } = props;
  return (
    <>
      <div className="flex items-center gap-3">
        <ChevronLeftIcon
          className={`cursor-pointer ${
            currentPage == 1 ? "text-gray-400" : ""
          }`}
          onClick={() => handlePageChange("prev")}
        />
        <div>
          Page {currentPage} of {pagesCount}
        </div>
        <ChevronRightIcon
          className={`cursor-pointer ${
            currentPage == pagesCount ? "text-gray-400" : ""
          }`}
          onClick={() => handlePageChange("next")}
        />
      </div>
    </>
  );
}

export default PaginationBox;
