
import * as CommentsAPI from '../api/comments'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'

export const getPostComments = ( postId, comments ) => (
  {
    type: GET_POST_COMMENTS,
    postId,
    items: comments,
  }
)

export const fetchPostComments = postId => dispatch => {
  CommentsAPI.getPostComments( postId )
    .then( comments =>  dispatch( getPostComments( postId, comments ) ) )
}