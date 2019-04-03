import { combineReducers } from 'redux'
import { categories, categoriesPosts } from './CategoryReducer'
import { posts } from "./PostReducer";

export default combineReducers({
  categories,
  posts,
  categoriesPosts
})