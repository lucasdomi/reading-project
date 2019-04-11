import { REQUEST_POST_COMMENTS, NEW_COMMENT, EDIT_COMMENT } from '../actions/CommentAction'

const initialPostCommentsState = {
}

export const postsComments = ( state = initialPostCommentsState, action ) => {
  const { comment } = action
  switch ( action.type ) {
    case REQUEST_POST_COMMENTS:
      const { postId, items } = action
      return {
        ...state,
        [postId]: {
          ...postId.items,
          items,
        }
      }
    case NEW_COMMENT:
    // const { comment } = action
    return {
      ...state,
      [postId]: {
        ...state[postId],
        items: [
          ...state[postId].items,
          comment,
        ]
      }
    }
    case EDIT_COMMENT: 
    return {
      ...state,
      [postId]: {
        ...state[postId],
        items: [
          ...state[postId].items,
          comment,
        ]
      }
    }
    default:
      return state
  }
}