import React, { Component } from "react";
import Heart from "./common/heart";
import { Link } from "react-router-dom";

class BlogTable extends Component {
  raiseSort = (path) => {
    const sorted = { ...this.props.currentSort };
    if (sorted.path === path)
      sorted.order = sorted.order === "asc" ? "desc" : "asc";
    else {
      sorted.order = "asc";
      sorted.path = path;
    }
    this.props.onSort(sorted);
  };

  render() {
    const { user, blogs, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th
              onClick={() => {
                this.raiseSort("title");
              }}
              scope="col"
            >
              Title
            </th>
            <th
              onClick={() => {
                this.raiseSort("author");
              }}
              scope="col"
            >
              Author
            </th>
            <th
              onClick={() => {
                this.raiseSort("type");
              }}
              scope="col"
            >
              Type
            </th>
            <th
              onClick={() => {
                this.raiseSort("likes");
              }}
              scope="col"
            >
              Rating
            </th>
            <th
              onClick={() => {
                this.raiseSort("createTime");
              }}
              scope="col"
            >
              Date
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link style={{ cursor: true }} to={`/blog/${blog._id}`}>
                    {blog.title}
                  </Link>
                </td>
                <td>{blog.author}</td>
                <td>{blog.type}</td>
                <td>
                  <Heart onLike={onLike} blog={blog} />
                </td>

                <td>{blog.createTime}</td>

                {user && user.author === blog.author && (
                  <React.Fragment>
                    <td>
                      <Link
                        style={{ cursor: true }}
                        className="btn btn-primary"
                        to={`/blogs/${blog._id}`}
                      >
                        Update
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          onDelete(blog);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </React.Fragment>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default BlogTable;
