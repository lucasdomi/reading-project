import { REQUEST_POSTS } from '../actions/PostActions'

const postsInitialState = {
  items: []
}

export const posts = ( state = postsInitialState, action ) => {
  switch ( action.type ) {
    case REQUEST_POSTS:
      const { items } = action
      return {
        ...state,
        items,
      }

    default:
      return state
  }
}
