import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux'; 
import {Link} from 'react-router-dom'
import {fetchCategories} from '../actions/CategoryAction';

class ListCategories extends Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    let contentCategorie = ''
    if (categories.items.length > 0) {
      contentCategorie = (
         <ul>
          { categories.items.map( category => (
            <li key={category.path}><Link to ={category.path}>{category.name}</Link></li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
        {contentCategorie}
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