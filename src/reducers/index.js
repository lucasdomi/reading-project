import { combineReducers } from 'redux'
import { categories, categoriesPosts } from './CategoryReducer'
import { posts, post } from "./PostReducer";

export default combineReducers({
  categories,
  posts,
  categoriesPosts,
  post
})