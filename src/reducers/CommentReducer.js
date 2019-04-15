import { REQUEST_POST_COMMENTS, NEW_COMMENT, EDIT_COMMENT, VOTE_COMMENT, DELETE_COMMENT } from '../actions/CommentAction'

const postCommentsStateInitial = {
  ids: [],
}

export const postsComments = ( state = postCommentsStateInitial, action ) => {

  const { postId, comment } = action
  const nextState = { ...state }
  switch ( action.type ) {
    case REQUEST_POST_COMMENTS:
      const { items } = action
      nextState[postId] = { ids: [] }

      items.forEach( item => {
        nextState[postId][item.id] = item
        nextState[postId].ids = [ ...nextState[postId].ids, item.id]
      })
      return nextState

    case NEW_COMMENT:
      nextState[postId][comment.id] = comment
      nextState[postId].ids = [ ...nextState[postId].ids, comment.id ]
      return nextState

    case EDIT_COMMENT:
      nextState[postId][comment.id] = {
        ...nextState[postId][comment.id],
        body: comment.body
      }
      return nextState

    case VOTE_COMMENT:
      nextState[postId][comment.id] = comment
      return nextState

    case DELETE_COMMENT:
      nextState[action.comment.parentId][action.comment.id] = action.comment
      nextState[postId].allIds = nextState[postId].ids.filter( id => id !== comment.id )
      return nextState
    
    default:
      return state
  }
}