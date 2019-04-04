import { GET_POST_COMMENTS } from '../actions/CommentAction'

const initialPostCommentsState = {
}

export const postsComments = ( state = initialPostCommentsState, action ) => {
  switch ( action.type ) {
    case GET_POST_COMMENTS:
      const { postId, items } = action
      return {
        ...state,
        [postId]: {
          ...postId.items,
          items,
        }
      }
    default:
      return state
  }
}