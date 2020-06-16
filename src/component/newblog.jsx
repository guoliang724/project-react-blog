import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getTypes } from "../services/types";
import { saveBlog } from "../services/blogs";

class NewBlog extends Form {
  state = {
    data: {
      title: "",
      author: this.props.user.author,
      type: "",
      content: "",
    },
    types: [],
    errors: {},
  };
  schema = {
    title: Joi.string().required(),
    type: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
  };
  componentDidMount = async () => {
    const types = await getTypes();
    this.setState({ types });
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

export default NewBlog;
