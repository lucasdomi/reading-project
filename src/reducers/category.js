import { GET_CATEGORIES } from '../actions/category';

const categoriesInitialState = {
  items: []
}

export const categories = ( state = categoriesInitialState, action ) => {
  switch ( action.type ) {
    case GET_CATEGORIES:
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}