
import * as CommentsAPI from '../api/comments'

export const REQUEST_POST_COMMENTS = 'REQUEST_POST_COMMENTS'

export const getPostComments = ( postId, comments ) => (
  {
    type: REQUEST_POST_COMMENTS,
    postId,
    items: comments,
  }
)

export const fetchPostComments = postId => dispatch => {
  CommentsAPI.getPostComments( postId )
    .then( comments =>  dispatch( getPostComments( postId, comments ) ) )
}