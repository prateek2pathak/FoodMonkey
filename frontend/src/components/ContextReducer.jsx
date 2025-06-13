import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {

    case "ADD":
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price }]

    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.id, 1);
      return newArr

    case "DROP":
      let newAr = []
      return newAr

    case "UPDATE":
      return state.map(food => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: food.qty + parseInt(action.qty),
            price: food.price + action.price
          };
        }
        return food;
      });

    default:
      console.log('Error in reducer');
      break;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
