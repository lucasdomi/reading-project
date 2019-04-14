import { combineReducers } from 'redux'
import { categories, categoriesPosts } from './CategoryReducer'
import { posts } from "./PostReducer";
import { postsComments } from "./CommentReducer";
export default combineReducers({
  categories,
  posts,
  categoriesPosts,
  postsComments
})