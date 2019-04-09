import React, {Component} from 'react';
import { createPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { connect } from 'react-redux'
import uuid from 'uuid';
class NewPost extends Component {
  state = {
    post : {
      category : '',
    } 
  }

  componentDidMount() {
    console.log(this.props)
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
    console.log("entrou", this.state.post.category);
  }

  submitPost = event => {
    const postBody = {...this.state.post, timestamp: Date.now(), id:uuid.v1()}
    this.props.createPost(postBody)
  }

  render () {
    // const { categories } = this.props
    // let fetchCategories = '';
    // fetchCategories = categories.items.map (category => (
    //   <option key={category.path} value={category.name}>{category.name}</option>
    // ))
    return (
      <div>
        <form autoComplete="off">
          <label>
            Title:
            <input type="text" name="title" onChange={this.handleChange}/>
          </label>

          <label>
            Category:
            <select
              name="category" 
              value={this.state.post.category} 
              onChange={(e) => this.setState({post: {category: e.target.value}})}
            >
              {this.fetchCategories()}
            </select>
          </label>
          
          <label>
            Autor:
            <input type="text" name="autor" onChange={this.handleChange}/>
          </label>

          <label>
            Content:
            <textarea name="content" onChange={this.handleChange}/>
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