import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions';

class PostsList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderPosts() {
        const { posts } = this.props;
        posts.map(post =>
            <li className="list-group-item">
                {post.title}
            </li>
        );
    }
    render() {
        return (
            <ul className="list-group">
                {this.renderPosts()};
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
