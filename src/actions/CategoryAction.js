import * as CategoryAPI from '../api/category'
import * as PostAPI from "../api/post";

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const REQUEST_POST_CATEGORIES = 'REQUEST_POST_CATEGORIES'

export const getCategories = categories => (
  {
    type: REQUEST_CATEGORIES,
    items: categories.categories,
  }
)

export const fetchCategories = () => dispatch => {
  CategoryAPI.getCategories()
    .then( categories => dispatch( getCategories( categories ) ) )
}

export const getCategoryPosts = ( category, posts ) => (
  {
    type: REQUEST_POST_CATEGORIES,
    category,
    posts,
  }
)

export const fetchCategoryPosts = category => dispatch => {
  PostAPI.getPostsByCategory( category )
    .then( posts => dispatch( getCategoryPosts( category, posts ) ) )
}