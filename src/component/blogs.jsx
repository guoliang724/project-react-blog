import React, { Component } from "react";
import Blog from "./blog";
import List from "./common/listgroup";
import { getBlogs, deleteBlog, UpdateBlogLike } from "../services/blogs";
import { getTypes } from "../services/types";
import Paginate from "../util/paginate";
import Sort from "../util/sort";
import { toast } from "react-toastify";

class Blogs extends Component {
  state = {
    blogs: [],
    types: [],
    currentPage: 1,
    selectedItem: "",
    searchQuery: "",
    maxNumberInPage: 3,
    currentSort: { path: "author", order: "asc" },
  };

  async componentDidMount() {
    const blogs = await getBlogs();

    let types = await getTypes();

    let newTypes = [{ type: "All Categories" }, ...types];
    this.setState({ blogs, types: newTypes });
  }

  handlePage = (page) => {
    this.setState({ currentPage: page });
  };

  handleSelected = (item) => {
    this.setState({ selectedItem: item, searchQuery: "", currentPage: 1 });
  };

  handleLike = async (blog) => {
    const originalBlogs = JSON.parse(JSON.stringify(this.state.blogs));
    console.log("1", originalBlogs);
    let blogs = [...this.state.blogs];
    const index = blogs.indexOf(blog);
    blog.likes += 1;
    blogs[index] = { ...blog };
    console.log("2", originalBlogs);
    try {
      this.setState({ blogs });
      await UpdateBlogLike(blog);
    } catch (ex) {
      console.log("having errors");
      this.setState({ blogs: originalBlogs });
    }
  };

  handleSort = (sorted) => {
    this.setState({ currentSort: sorted });
  };

  handleDelete = async (blog) => {
    const originalBlogs = [...this.state.blogs];

    const blogs = originalBlogs.filter((e) => e._id !== blog._id);
    console.log(blogs);
    this.setState({ blogs });

    try {
      await deleteBlog(blog);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("it has been deleted already.... ");
      }
      this.setState({ blogs: originalBlogs });
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedItem: "", currentPage: 1 });
  };
  render() {
    let {
      blogs,
      types,
      currentPage,
      selectedItem,
      maxNumberInPage,
      currentSort,
      searchQuery,
    } = this.state;
    const { user } = this.props;
    let filteredBlogs = blogs;
    if (searchQuery)
      filteredBlogs = blogs.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedItem._id)
      filteredBlogs = blogs.filter((e) => e.type === selectedItem.type);

    const sortedBlogs = Sort(filteredBlogs, currentSort);
    blogs = Paginate(sortedBlogs, currentPage, maxNumberInPage);

    return (
      <div className="row pr-2 ">
        <List className="col"
          types={types}
          selectedItem={selectedItem}
          onSelected={this.handleSelected}
        />
        <Blog className="col-5"
          user={user}
          blogs={blogs}
          length={filteredBlogs.length}
          currentPage={currentPage}
          maxNumberInPage={maxNumberInPage}
          onPage={this.handlePage}
          onLike={this.handleLike}
          onSort={this.handleSort}
          onDelete={this.handleDelete}
          onSearch={this.handleSearch}
          currentSort={currentSort}
          searchQuery={searchQuery}
        />
      </div>
    );
  }
}

export default Blogs;
