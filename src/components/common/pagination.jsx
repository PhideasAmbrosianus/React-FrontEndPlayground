import React, { Component } from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); //Reminder range doesn't

  console.log(pages);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <button className="page-link">{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
