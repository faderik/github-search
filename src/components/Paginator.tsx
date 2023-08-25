type PaginatorProps = {
  currentPage: number;
  setCurrentPage: (state: number) => void;
  totalPage: number;
};

export default function Paginator({
  currentPage,
  setCurrentPage,
  totalPage,
}: PaginatorProps) {
  return (
    <div className="paginator">
      <button
        className="paginator-btn"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {currentPage > 2 && (
        <button className="paginator-btn" onClick={() => setCurrentPage(1)}>
          1
        </button>
      )}

      {currentPage - 3 > 0 && <div className="">{"..."}</div>}

      {currentPage - 1 > 0 && (
        <button
          className="paginator-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}
      <button className="paginator-btn active">{currentPage}</button>
      {currentPage + 1 < totalPage && (
        <button
          className="paginator-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage + 2 < totalPage && <div className="">{"..."}</div>}

      {totalPage > 1 && (
        <button
          className="paginator-btn"
          onClick={() => setCurrentPage(totalPage)}
        >
          {totalPage}
        </button>
      )}
      <button
        className="paginator-btn"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
}
