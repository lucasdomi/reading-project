import { REQUEST_ALL_POSTS, REQUEST_POST, NEW_POST, EDIT_POST, VOTE_POST, DELETE_POST } from '../actions/PostActions'


const postsStateInitial = {
  ids: []
}

export const posts = ( state = postsStateInitial, action ) => {
  let myState = { ...state }
  const { post } = action

  switch ( action.type ) {
    case REQUEST_ALL_POSTS:
      const { items } = action
      items.forEach( item => {
        myState[item.id] = item
        if (!myState.ids.includes(item.id)) {
          myState.ids = [...myState.ids, item.id]
        }
      })
      return myState

    case REQUEST_POST:
      const { page } = action
      myState[page.id] = page

      if (!myState.ids.includes(page.id)) {
        myState.ids = [...myState.ids, page.id]
      }

      return myState

    case NEW_POST:
      myState[post.id] = post
      myState.ids = [...myState.ids, post.id]

      return myState

    case VOTE_POST:
      myState[post.id] = post
      return myState

    case EDIT_POST:
      myState[post.id] = post
      return myState

    case DELETE_POST:
      myState[post.id] = post
      return myState

    default:
      return state
  }
}

