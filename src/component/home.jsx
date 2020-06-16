import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div className="jumbotron mt-5 pt-1">
        <h1 className="display-8">Hello!</h1>
        <p>
          I am a React and Node.js beginer buliding this for learning purpose.
        </p>
        <p>
          Skills like Pagination,Filtering,Sorting,Protecting
          Routes,Authentication and Authorization are implementing on this
          website
        </p>
        <p>
          Once you have registered(automatically login), you are able to
          create,update and delete a blog created by yourself.
        </p>
        <div>Back-end: Node.js + express+MongoDB</div>

        <div>Front-end: React + Axios</div>
        <br></br>
        <p>Email:g.zhang724@mybvc.ca</p>
        <p>欢迎交流学习</p>
        <p>
          <Link className="btn btn-primary btn-lg" to="/blogs" role="button">
            Learn more &raquo;
          </Link>
        </p>
      </div>
    );
  }
}

export default Home;
