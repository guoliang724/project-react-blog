import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { currentPage, maxNumberInPage, length, onPage } = this.props;
    const numbers = Math.ceil(length / maxNumberInPage);
    const pageArrary = _.range(1, numbers + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageArrary.map((page, index) => (
            <li
              key={index}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <button
                className="page-link"
                onClick={() => {
                  onPage(page);
                }}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
