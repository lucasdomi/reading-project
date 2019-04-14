import { REQUEST_ALL_POSTS, REQUEST_POST, NEW_POST, EDIT_POST, VOTE_POST } from '../actions/PostActions'


const postsStateInitial = {
  ids: []
}

export const posts = ( state = postsStateInitial, action ) => {
  let nextState = { ...state }
  const { post } = action

  switch ( action.type ) {
    case REQUEST_ALL_POSTS:
      const { items } = action
      items.forEach( item => {
        nextState[item.id] = item
        if (!nextState.ids.includes(item.id)) {
          nextState.ids = [...nextState.ids, item.id]
        }
      })
      return nextState

    case REQUEST_POST:
      const { page } = action
      nextState[page.id] = page

      if (!nextState.ids.includes(page.id)) {
        nextState.ids = [...nextState.ids, page.id]
      }

      return nextState

    case NEW_POST:
      nextState[post.id] = post
      nextState.ids = [...nextState.ids, post.id]

      return nextState

    case VOTE_POST:
      nextState[post.id] = post
      return nextState

    case EDIT_POST:
      nextState[post.id] = post
      return nextState

    default:
      return state
  }
}

