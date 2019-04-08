import { REQUEST_ALL_POSTS, REQUEST_POST, NEW_POST } from '../actions/PostActions'

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
      const { items } = action
      return {
        ...state,
        items,
      }
    case NEW_POST:
      const { post } = action
      return {
        ...state,
        items: [
          ...state.items,
          post
        ]
      }
    default:
      return state
  }
}