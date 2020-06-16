import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTypes } from "../services/types";
import { getBlog, saveBlog } from "../services/blogs";

class UpdateForm extends Form {
  state = {
    data: {
      title: "",
      author: "",
      type: "",
      createTime: "",
      likes: 0,
      content: "",
    },
    types: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    createTime: Joi.string(),
    likes: Joi.number(),
    author: Joi.string().required(),
    content: Joi.string().required(),
  };

  populateTypes = async () => {
    const types = await getTypes();
    console.log("newform.types", types);
    this.setState({ types });
  };
  populateBlogs = async () => {
    const typeId = this.props.match.params.id;
    console.log("params.id", typeId);
    //if (typeId === "new") this.props.hisotry.push("/new ");
    try {
      const blog = await getBlog(typeId);
      this.setState({ data: this.maptoViewModel(blog) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/no-page");
      if (ex.response && ex.response.status === 500)
        this.props.history.replace("/no-page");
    }
  };
  async componentDidMount() {
    await this.populateTypes();
    await this.populateBlogs();
  }
  maptoViewModel = (blog) => {
    return {
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      createTime: blog.createTime,
      likes: blog.likes,
      type: blog.type,
      content: blog.content,
    };
  };
  doSubmit = async () => {
    console.log("this.state.data", this.state.data);
    await saveBlog(this.state.data);
    this.props.history.push("/blogs");
  };
  render() {
    return (
      <div>
        <h1>Blog Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("author", "Author", true)}
          {this.renderSelect("type", "Type")}
          {this.renderTextArea("content", "Content")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default UpdateForm;
