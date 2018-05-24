import React, { Component } from 'react';
import axios from '../../../axios';
// import { Link } from 'react-router-dom'
import { Route } from "react-router-dom";

import Post from '../../../components/Post/Post'
import './Posts.css'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {

    state = {
        posts: []
    };
        
    // postClicked = id => {
    //     this.setState({ selectedPostId: id });
    // };
    postClicked = id => {
        this.props.history.push({pathname: "/posts/" + id});
        //ALT
        //this.props.history.push("/posts" + id);
    };

    componentDidMount() {
        console.log(this.props)
    const posts = axios.get("posts")
        .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
            return {
            ...post,
            author: "Max"
            };
        });
        this.setState({ posts: updatedPosts });
        })
        .catch(error => {
        console.log(error);
        // this.setState({ error: true });
        });
    }

    render () {
        if(this.state.error){
            let posts = <p style={{ textAlign: "center", color: "red" }}>Something went wrong</p>
        };
          const posts = this.state.posts.map(post => {
            return (
            //   <Link to={"/posts/" + post.id} key={post.id}>
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postClicked(post.id)}
                />
            //   </Link>
            );
          });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
          </div>
        );
    }
}

export default Posts