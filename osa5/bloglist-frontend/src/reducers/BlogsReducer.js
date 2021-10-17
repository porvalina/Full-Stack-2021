
import blogService from '../services/blogs'

const initialState = []

export const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_BLOGS':
    return action.data
  default:
    return state
  }
}

const setBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs
  }
}

const compareFn = (blog1, blog2) => {
  return blog2.likes - blog1.likes
}

export const fetchBlogs = () => {
  return async dispatch => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs.sort(compareFn)))
    )
  }
}