import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPosts } from '../actions';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
    }
    renderField(field) {
        return (
            <div className="form-group">
                <label>
                    {field.label}
                </label>
                <input {...field.input} type="text" className="form-control" />
            </div>
        );
    }

    onSubmit(values) {
        // send the values to bacnekd api
        this.props.createPosts(values, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const { renderField, onSubmit } = this;
        const { handleSubmit } = this.props;
        return (
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field label="Title" name="title" component={renderField} />
                    <Field
                        label="Category"
                        name="category"
                        component={renderField}
                    />
                    <Field
                        label="Content"
                        name="content"
                        component={renderField}
                    />
                    <div>
                        <button className="btn btn-primary" type="submit">
                            Save
                        </button>
                        <Link className="btn btn-danger" to="/">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'postNewForm'
})(connect(null, { createPosts })(PostsNew));
