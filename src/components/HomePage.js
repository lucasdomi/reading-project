import React from 'react';
import Categories from './ListCategories'
import Posts from './ListPosts'
import MenuDrawer from './MenuDrawer';

class HomePage extends React.Component {

  render () {
    return (
      <div>
        <MenuDrawer namePage="Posts" newPost="/post/create"/>
        {/* <Categories/> */}
        <Posts/>
      </div>
    )
  }

}

export default HomePage
