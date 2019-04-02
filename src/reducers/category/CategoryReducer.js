import { REQUEST_CATEGORIES } from '../../actions/category/CategoryAction';

const categoriesInitialState = {
  items: []
}

export const categories = ( state = categoriesInitialState, action ) => {
  switch ( action.type ) {
    case REQUEST_CATEGORIES:
    const {items} = action
      return {
        ...state,
        items,
      }
    default:
      return state
  }
}