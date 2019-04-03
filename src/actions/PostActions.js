import * as PostAPI from '../api/post'

export const REQUEST_POSTS = 'REQUEST_POSTS'

export const getPosts = posts => (
  {
    type: REQUEST_POSTS,
    items: posts,
  }
)

export const fetchPosts = () => dispatch => {
  PostAPI.getPosts()
   .then( posts => dispatch( getPosts( posts )))
}
