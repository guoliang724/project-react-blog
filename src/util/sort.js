import _ from "lodash";

const Sort = (items, currentSort) => {
  const result = _.orderBy(items, [currentSort.path], [currentSort.order]);
  return result;
};

export default Sort;
