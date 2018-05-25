import React, { Component } from "react";
// import axios from "axios";
// import axios from '../../axios'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import "./Blog.css";
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
// load components asynchronously so that code downloaded on browser shrinks
import asyncComponent from '../../hoc/asyncComponent'
const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: false
  }

  render() {

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink to="/posts/" exact>Posts</NavLink></li>
              <li><NavLink to={{pathname: '/new-post', hash: '#submit', search: '?quick-submit=true'}}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Homeeeee</h1>}/>
        <Route path="/" exact render={() => <h1>Homeeee asdfasfe</h1>}/> */}\
        <Switch>
        {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
        <Route path="/posts/" component={Posts} />
        {/* <Route render={() => <h1>Not found</h1>} /> */}
        {/* redirect doesn't work for root route below because of catch all above */}
        <Redirect from="/" to="/posts/" />
        {/* <Route path="/" component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
