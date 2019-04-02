import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'; 
import {fetchCategories} from './actions/category/CategoryAction';

class App extends Component {
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
            <li key={category.path}>{ category.name }</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)