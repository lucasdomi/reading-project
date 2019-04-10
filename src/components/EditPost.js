import React, {Component} from 'react';
import { editPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { fetchPost } from '../actions/PostActions';
import { connect } from 'react-redux'

class EditPost extends Component {
  state = {
    post : {
      id: (this.props.post.items) && (this.props.post.items.id || ''),
      title: (this.props.post.items) && (this.props.post.items.title || ''),
      category: (this.props.post.items) && (this.props.post.items.category || ''),
      body: (this.props.post.items) && (this.props.post.items.body || ''),
      author: (this.props.post.items) && (this.props.post.items.author || ''),
    } 
  }

  componentDidMount() {
    console.log(this.props.post)
    !this.props.categories.items.length && this.props.fetchCategories()
    this.props.fetchPost(this.props.match.params.postId)
    // const { postId } = this.props.match.params
    const post = this.props.post;
    console.log("aqui",post);
    if (post.items)
      this.setState( {
        id: (post.items.id || ''),
        title: (post.items.title || ''),
        category: (post.items.category || ''),
        body: (post.items.body || ''),
        author:(post.items.author || ''),
      })
  }

  fetchCategories () {
    const { categories } = this.props
    let fetchCategories = '';
    fetchCategories = categories.items.map (category => (
      <option key={category.path} value={category.name}>{category.name}</option>
    ))
    return fetchCategories;
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [event.target.name]: event.target.value
      }
    })
  }

  submitPost = event => {
    const { post } = this.state
    this.props.editPost( post )
  }

  render () {
    return (
      <div>
        <form autoComplete="off">
          <label>
            Title:
            <input type="text" name="title" value={this.state.post.title}
              onChange={(e) => this.handleChange(e)}
            />
          </label>

          <label>
            Category:
            <select
              name="category" 
              value={this.state.post.category || ''} 
              onChange={(e) => this.handleChange(e)}
            >
              {this.fetchCategories()}
            </select>
          </label>
          
          <label>
            Author:
            <input type="text" name="author" value={this.state.post.author || ''}
              onChange={(e) => this.handleChange(e)}
              />
          </label>

          <label>
            Content:
            <textarea name="body" value={this.state.post.body || ''}
              onChange={(e) => this.handleChange(e)}
            />
          </label>

          <button onClick={this.submitPost}>
            Send
          </button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = ({ categories, post }) => {
  return {
    categories,
    post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch( editPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
    fetchPost: postId => dispatch( fetchPost( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)