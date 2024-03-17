import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./localStorage";
export const addLocalCart = (cartItem) => {
  setLocalStorage("cart", cartItem);
};
