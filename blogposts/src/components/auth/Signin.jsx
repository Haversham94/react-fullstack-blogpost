import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signinUser } from '../../actions';

class Signin extends Component {
    constructor() {
        super();

        this.renderField = this.renderField.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    renderField(field) {
        return (
            <div className="form-group">
                <label>
                    {field.label}
                </label>
                <input
                    {...field.input}
                    type={field.type}
                    className="form-control"
                />
            </div>
        );
    }
    onFormSubmit(values) {
        this.props.signinUser(values, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const { handleSubmit } = this.props;
        const { renderField, onFormSubmit } = this;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Field
                            label="Email"
                            type="text"
                            name="email"
                            component={renderField}
                        />
                        <Field
                            label="Password"
                            type="password"
                            name="password"
                            component={renderField}
                        />
                        <button
                            onClick={handleSubmit(onFormSubmit)}
                            type="submit"
                            className="btn btn-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'signin'
})(connect(null, { signinUser })(Signin));
