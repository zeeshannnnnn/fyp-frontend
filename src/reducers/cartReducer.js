export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          title: action.cart.title,
          photo: action.cart.photo,
          price: action.cart.price,
          id: action.cart.id,
          quantity: action.cart.quantity,
        },
      ];

    case "DELETE_ITEM":
      return state.filter((cart) => cart.id !== action.id);

    default:
      return state;
  }
};
