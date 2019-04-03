import { REQUEST_CATEGORIES, REQUEST_POST_CATEGORIES } from '../actions/CategoryAction';

const categoriesInitialState = {
  items: []
}
const categoryInitialPostsState = {}

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

export const categoriesPosts = ( state = categoryInitialPostsState, action ) => {
  switch ( action.type ) {
    case REQUEST_POST_CATEGORIES:
      const { category, posts } = action
      return {
        ...state,
        [category]: {
          ...category.posts,
          posts,
        }
      }
    default:
      return state
  }
}