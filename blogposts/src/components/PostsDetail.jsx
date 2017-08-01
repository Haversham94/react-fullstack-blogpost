import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsDetail extends Component {
    constructor() {
        super();

        this.onDeletePost = this.onDeletePost.bind(this);
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }
    onDeletePost() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const { onDeletePost } = this;
        const { post } = this.props;
        if (!post) {
            return null;
        }
        return (
            <div className="container">
                <Link className="text-left btn btn-link" to="/">
                    Back to index
                </Link>
                <button
                    onClick={onDeletePost}
                    className="pull-right btn btn-danger">
                    Delete post
                </button>
                <h1>Post Details!</h1>
                <div>
                    <h3>
                        {post.title}
                    </h3>
                    <h6>
                        Categories: {post.category}
                    </h6>
                    <p>
                        {post.content}
                    </p>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ posts }, ownProps) {
    return {
        post: posts[ownProps.match.params.id]
    };
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsDetail);
