import * as CategoryAPI from '../../api/category'
export const REQUEST_CATEGORIES = 'GET_CATEGORIES'

export const getCategories = categories => (
  {
    type: REQUEST_CATEGORIES,
    items: categories.categories,
  }
)

export const fetchCategories = () => dispatch => {
  CategoryAPI.getCategories()
    .then( categories => dispatch( getCategories( categories ) ) )
}