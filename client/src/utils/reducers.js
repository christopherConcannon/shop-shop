// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
} from '../utils/actions';

import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch(action.type) {
    // if action type value is the value of 'UPDATE_PRODUCTS', return a new state object with an updated products array
    case UPDATE_PRODUCTS: 
      return {
        ...state,
        products: [...action.products]
      }

    // if action type value is the value of 'UPDATE_CATEGORIES', return a new state object with an updated products array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      }

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }
    

    // if it's none of these actions, do not update state at all and keep things the same
    default: 
      return state;
      
  }
}

//  used to help initialize our global state object and then provide us with the functionality for updating that state by automatically running it through our custom reducer() function. Think of this as a more in-depth way of using the useState() Hook
export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}