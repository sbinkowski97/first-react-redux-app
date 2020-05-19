import API from "data/fetch";
import { ALL_CATEGORIES_GET } from "data/constants";

export const fetchAllCategories = () => {
  const promise = API.common.fetchAllCategories();

  return {
    type: ALL_CATEGORIES_GET,
    promise,
  };
};
