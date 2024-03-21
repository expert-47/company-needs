/** @format */

import { useEffect } from "react";
import { PaginationNext, PaginationPrev } from "@/svg";
import { useRouter } from "next/router";

const Pagination = ({
  items = [],
  countOfPage = 12,
  paginatedData,
  currentPage,
  setcurrentPage,
  maxPageNumbers = 5,
  goToPage,
  totalPage,
  pagenationData,
  // Set the maximum number of pagination numbers to display
}) => {
  const pageStart = (currentPage - 1) * countOfPage;

  const route = useRouter;

  function setPage(idx) {
    console.log("idx", idx);
    if (idx <= 0 || idx > totalPage) {
      return;
    }
    goToPage(idx);
    // setcurrentPage(idx);
    window.scrollTo(0, 0);
    // paginatedData(items, pageStart, countOfPage);
  }

  // useEffect(() => {
  // paginatedData(items, pageStart, countOfPage);
  // }, [items, pageStart, countOfPage]);

  const renderPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const end = Math.min(start + maxPageNumbers - 1, totalPage);

    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i} onClick={() => setPage(i)}>
          <span className={`${currentPage === i ? "current" : ""}`}>{i}</span>
        </li>
      );
    }

    if (start > 1) {
      pages.unshift(<li key={1}>...</li>);
    }

    if (end < totalPage) {
      pages.push(<li key={totalPage}>...</li>);
    }

    return pages;
  };

  return (
    <nav>
      {totalPage > 1 && (
        <ul>
          <li>
            <button
              onClick={() => setPage(currentPage - 1)}
              className={`tp-pagination-prev prev page-numbers ${
                currentPage === 1 && "disabled"
              }`}>
              <PaginationPrev />
            </button>
          </li>

          {renderPageNumbers()}

          <li>
            <button
              onClick={() => setPage(currentPage + 1)}
              className={`next page-numbers ${
                currentPage === totalPage ? "disabled" : ""
              }`}>
              <PaginationNext />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
