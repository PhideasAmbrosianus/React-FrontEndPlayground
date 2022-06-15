import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  const { items, textProperty, valueProperty, onItemSelect, selectedItem } =
    props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <button
          className={
            item === selectedItem
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </button>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

Filter.propTypes = {
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
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

export default Filter;
