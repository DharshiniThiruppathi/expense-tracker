import React from "react";
export default function Pagination({ currentPage, total, itemsPerPage, setCurrentPage }) {
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
      <button disabled={currentPage * itemsPerPage >= total} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
    </div>
  );
}
