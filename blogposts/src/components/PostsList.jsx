import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions';

class PostsList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
        const { posts } = this.props;
        return _.map(posts, post =>
            <li className="list-group-item" key={post.id}>
                <Link to={`/posts/${post.id}`}>
                    {post.title}
                </Link>
            </li>
        );
    }
    render() {
        return (
            <div className="container">
                <div className="text-right">
                    <Link className="btn btn-link" to="/posts/new">
                        Create a new post
                    </Link>
                </div>
                <h1>Posts</h1>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
