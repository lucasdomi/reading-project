export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = data => (
  {
    type: GET_CATEGORIES,
    items: data.items,
  }
)