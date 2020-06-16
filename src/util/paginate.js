import _ from "lodash";

const Paginate = (items, currentPage, MaxNumberInPage) => {
  const startIndex = (currentPage - 1) * MaxNumberInPage;
  return _(items).slice(startIndex).take(MaxNumberInPage).value();
};

export default Paginate;
