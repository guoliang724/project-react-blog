import { getBlog } from "../services/blogs";
import React from "react";
import Form from "../component/common/form";
import { toast } from "react-toastify";
import Joi from "joi-browser";
class ReadForm extends Form {
  state = {
    data: {
      title: "",
      content: "",
    },
    errors: {},
  };
  schema = {
    title: Joi.string().required(),
    content: Joi.string().required(),
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log("id", id);
    try {
      let blog = await getBlog(id);
      blog = this.ViewModel(blog);
      console.log(blog);
      this.setState({ data: blog });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast("Bad Request....");
        this.props.history.replace("/no-page");
      }
    }
  }
  ViewModel(blog) {
    return {
      title: blog.title,
      content: blog.content,
    };
  }

  render() {
    return (
      <React.Fragment>
        <form>
          {this.renderInput("title", "Title", true)}
          {this.renderTextArea("content", "Content", true)}
        </form>
      </React.Fragment>
    );
  }
}

export default ReadForm;
