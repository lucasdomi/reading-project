import React, {Component} from 'react';
import { editPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import MenuDrawer from './MenuDrawer';
class EditPost extends Component {
  state = {
    post : {
      title: '',
      body: '',
      author: '',
      category: '',
    } 
  }

  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
    const { postId } = this.props.match.params
    console.log(this.props)
    const post = this.props.posts[postId]
    if (post) {
      this.setState({
        ...this.state,
        post
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts) {
      const { postId } = this.props.match.params
      const post = this.props.posts[postId]
      this.setState({
        ...this.state,
        post
      })
    }
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
    this.props.editPost(post)
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <MenuDrawer namePage="Edit Post" backToHome/>
        <form autoComplete="off" style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <TextField
            id="title"
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            value={this.state.post.title}
            onChange={(e) => this.handleChange(e)}
          />
          {/* <label>
            Title:
            <input type="text" name="title" value={this.state.post.title}
              onChange={(e) => this.handleChange(e)}
            />
          </label> */}

          {/* <label>
            Category:
            <select
              name="category" 
              value={this.state.post.category || ''} 
              onChange={(e) => this.handleChange(e)}
            >
              {this.fetchCategories()}
            </select>
          </label> */}

          <FormControl fullWidth>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={this.state.post.category}
              onChange={(e) => this.handleChange(e)}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              { this.fetchCategories() }
            </Select>
          </FormControl>
        
          <TextField
              id="author"
              name="author"
              fullWidth
              label="Author"
              margin="normal"
              value={this.state.post.author || ''}
              onChange={(e) => this.handleChange(e)}
            />
          <TextField
            id="content"
            name="body"
            label="Content"
            placeholder="Content"
            multiline
            fullWidth
            value={this.state.post.body || ''}
            rows={2}
            rowsMax={4}
            onChange={(e) => this.handleChange(e)}
          />
          <Button style={{marginTop: '15px', marginBottom: '10px'}} onClick={this.submitPost} variant="contained" color="primary">
            Send
          </Button>
        </form>
      </div>
    )
  }

}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch( editPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)