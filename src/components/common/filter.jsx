import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  const {
    items: allItems,
    clearFilterLabel,
    currentFilter,
    onFilterChange,
    textProperty,
    valueProperty,
  } = props;

  //Build local array of items
  let items = [...allItems];

  //Add the clear filter button to top

  return (
    <ul className="list-group">
      <button
        className="list-group-item list-group-item-action"
        style={{ cursor: "pointer" }}
      >
        {clearFilterLabel}
      </button>
      {items.map((item) => (
        <button
          className="list-group-item list-group-item-action"
          style={{ cursor: "pointer" }}
          key={[valueProperty]}
        >
          {item[textProperty]}
        </button>
      ))}
    </ul>
  );
};

{
  /* <nav aria-label="Page navigation example">
<ul className="pagination">
  {pages.map((page) => (
    <li
      key={page}
      className={page === currentPage ? "page-item active" : "page-item"}
    >
      <button className="page-link" onClick={() => onPageChange(page)}>
        {page}
      </button>
    </li>
  ))}
</ul>
</nav> */
}

// Filter.propTypes = {
//   itmitems, ber.isFilterallItem, iredFilter };

export default Filter;
