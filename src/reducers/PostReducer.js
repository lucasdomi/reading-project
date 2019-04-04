import { REQUEST_ALL_POSTS, REQUEST_POST } from '../actions/PostActions'

const postsInitialState = {
  items: []
}

export const posts = ( state = postsInitialState, action ) => {
  switch ( action.type ) {
    case REQUEST_ALL_POSTS:
      const { items } = action
      return {
        ...state,
        items,
      }
    default:
      return state
  }
}

export const post = ( state = {}, action ) => {
  switch ( action.type ) {
    case REQUEST_POST:
      const { content } = action
      return {
        ...state,
        content,
      }
    default:
      return state
  }
}