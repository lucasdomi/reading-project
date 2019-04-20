import React, {Component} from 'react';
import { createPost } from '../actions/PostActions'
import { fetchCategories } from '../actions/CategoryAction'
import { connect } from 'react-redux'
import uuid from 'uuid';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import MenuDrawer from './MenuDrawer'
import "../css/PostPage.css"

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
  }

  submitPost = event => {
    const postBody = {...this.state.post, timestamp: Date.now(), id:uuid.v1()}
    this.props.createPost(postBody)
    this.props.history.push('/')
  }

  render () {
    return (
      <div>
        <MenuDrawer namePage="New Post" backToHome/>
        <form className="form-post" autoComplete="off">
          <TextField
            id="title"
            name="title"
            fullWidth
            label="Title"
            margin="normal"
            onBlur={(e) => this.handleChange(e)}
          />
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
              label="Author"
              fullWidth
              margin="normal"
              onBlur={(e) => this.handleChange(e)}
            />

          <TextField
            id="content"
            name="body"
            label="Content"
            placeholder="Content"
            multiline
            fullWidth
            rows={2}
            rowsMax={4}
            onBlur={(e) => this.handleChange(e)}
          />
          <Button className="button-send-post" onClick={this.submitPost} variant="contained" color="primary">
            Send
          </Button>
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