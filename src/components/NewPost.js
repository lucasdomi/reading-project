import React, {Component} from 'react';
import { createPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { connect } from 'react-redux'
import uuid from 'uuid';
class NewPost extends Component {
  state = {
    post : {
      id: '',
      title:  '',
      category:  '',
      body: '',
      author: '',
    } 
  }

  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
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
    console.log("entrou", event.target.value);
  }

  submitPost = event => {
    const postBody = {...this.state.post, timestamp: Date.now(), id:uuid.v1()}
    this.props.createPost(postBody)
  }

  render () {
    return (
      <div>
        <form autoComplete="off">
          <label>
            Title:
            <input type="text" name="title" 
              onChange={(e) => this.handleChange(e)}
            />
          </label>

          <label>
            Category:
            <select
              name="category" 
              value={this.state.post.category} 
              onChange={(e) => this.handleChange(e)}
            >
              {this.fetchCategories()}
            </select>
          </label>
          
          <label>
            Author:
            <input type="text" name="author" 
              onChange={(e) => this.handleChange(e)}
              />
          </label>

          <label>
            Content:
            <textarea name="body" 
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

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
}
  
  const mapDispatchToProps = dispatch => {
    return {
      createPost: post => dispatch( createPost( post ) ),
      fetchCategories: () => dispatch( fetchCategories() ),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(NewPost)