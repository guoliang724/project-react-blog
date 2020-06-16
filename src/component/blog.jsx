import React, { Component } from "react";
import Pagination from "./pagination";
import BlogTable from "./blogtable";
import { Link } from "react-router-dom";
import SearchBox from "./searchbox";

class Blog extends Component {
  render() {
    const {
      user,
      blogs,
      currentPage,
      maxNumberInPage,
      length,
      searchQuery,
      onLike,
      onPage,
      onSort,
      onDelete,
      onSearch,
      currentSort,
    } = this.props;

    return (
      <div className="col-9 p-3 m-3">
        {user && (
          <Link to="/blog/new" className="btn btn-primary">
            New Blog
          </Link>
        )}
        <p className="text-success">Showing {length} wonderful articles </p>
        <SearchBox value={searchQuery} onChange={onSearch} />
        <BlogTable
          user={user}
          blogs={blogs}
          onLike={onLike}
          onSort={onSort}
          onDelete={onDelete}
          currentSort={currentSort}
        />
        <Pagination
          currentPage={currentPage}
          maxNumberInPage={maxNumberInPage}
          length={length}
          onPage={onPage}
        />
      </div>
    );
  }
}

export default Blog;
