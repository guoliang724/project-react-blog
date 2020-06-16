import React, { Component } from "react";
import "./heart.css";
class Button extends Component {
  render() {
    const { blog, onLike } = this.props;
    const { likes } = blog;
    return (
      <div>
        <i
          className="fas fa-heart red mr-2"
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("click", blog);
            onLike(blog);
          }}
        ></i>
        {likes}
      </div>
    );
  }
}

export default Button;
