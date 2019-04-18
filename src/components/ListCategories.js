import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom'
import {fetchCategories} from '../actions/CategoryAction';

class ListCategories extends Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  listCategories () {
    const { categories } = this.props
    if (categories.items.length > 0) {
      return (
         <ul>
          { categories.items.map( category => (
            <li key={category.path}><Link to ={category.path}>{category.name}</Link></li>
          ))}
        </ul>
      )
    }
    else {
      return (
        <p>No categories :(</p>
      )
    }
  }
  render() {
    return (
      <div className="App">
        {this.listCategories()}
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)

