import { REQUEST_POST_COMMENTS, NEW_COMMENT, EDIT_COMMENT, VOTE_COMMENT, DELETE_COMMENT } from '../actions/CommentAction'

const postCommentsStateInitial = {
  ids: [],
}

export const postsComments = ( state = postCommentsStateInitial, action ) => {

  const { postId, comment } = action
  const myState = { ...state }
  switch ( action.type ) {
    case REQUEST_POST_COMMENTS:
      const { items } = action
      myState[postId] = { ids: [] }

      items.forEach( item => {
        myState[postId][item.id] = item
        myState[postId].ids = [ ...myState[postId].ids, item.id]
      })
      return myState

    case NEW_COMMENT:
      myState[postId][comment.id] = comment
      myState[postId].ids = [ ...myState[postId].ids, comment.id ]
      return myState

    case EDIT_COMMENT:
      myState[postId][comment.id] = {
        ...myState[postId][comment.id],
        body: comment.body
      }
      return myState

    case VOTE_COMMENT:
      myState[postId][comment.id] = comment
      return myState

    case DELETE_COMMENT:
      myState[action.comment.parentId][action.comment.id] = action.comment
      myState[postId].allIds = myState[postId].ids.filter( id => id !== comment.id )
      return myState
    
    default:
      return state
  }
}