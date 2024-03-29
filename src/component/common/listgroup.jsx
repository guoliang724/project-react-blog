import React, { Component } from "react";

class List extends Component {
  render() {
    const { types, selectedItem, onSelected } = this.props;

    return (
      <div className="cate_list pt-5">
        <ul className="list-group col p-3">
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => {
                onSelected(type);
              }}
              className={
                type.type === selectedItem.type
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {type.type}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;
