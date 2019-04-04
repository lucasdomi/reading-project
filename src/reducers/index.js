import { combineReducers } from 'redux'
import { categories, categoriesPosts } from './CategoryReducer'
import { posts, post } from "./PostReducer";
import { postsComments } from "./CommentReducer";
export default combineReducers({
  categories,
  posts,
  categoriesPosts,
  post,
  postsComments
})