import * as PostAPI from '../api/post'

export const REQUEST_ALL_POSTS = 'REQUEST_ALL_POSTS'
export const REQUEST_POST= 'REQUEST_POST';

export const getPosts = posts => (
  {
    type: REQUEST_ALL_POSTS,
    items: posts,
  }
)

export const fetchPosts = () => dispatch => {
  PostAPI.getPosts()
   .then( posts => dispatch(getPosts(posts)))
}

export const getPost = post => {
  return {
    type: REQUEST_POST,
    content: post,
  }
}

export const fetchPost = postId => dispatch => {
  PostAPI.getPost( postId )
    .then( post => dispatch(getPost(post)))
}
